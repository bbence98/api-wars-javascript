function createCell(tr, data) {
    const td = document.createElement('td');
    td.innerHTML = data;
    tr.appendChild(td);
}


function createRowForPlanet(tbl, data) {
    const tr = document.createElement('tr');
    tr.className = 'planets';
    createCell(tr, data['name']);
    createCell(tr, data['diameter']);
    createCell(tr, data['climate']);
    createCell(tr, data['terrain']);
    createCell(tr, data['surface_water']);
    createCell(tr, data['population']);
    createCell(tr, `<button type="button" class="residents user-button">${data['residents'].length} Residents</button>`);
    createCell(tr, '<button type="button" class="vote user-button">Vote</button>');
    tbl.appendChild(tr);
}


function createRowForPerson(tbl, data) {
    const tr = document.createElement('tr');
    tr.setAttribute('class', 'residents-row');
    createCell(tr, data['name']);
    createCell(tr, data['height']);
    createCell(tr, data['mass']);
    createCell(tr, data['hair_color']);
    createCell(tr, data['skin_color']);
    createCell(tr, data['eye_color']);
    createCell(tr, data['birth_year']);
    createCell(tr, data['gender']);
    tbl.appendChild(tr);
}


function emptyRows(rows) {
    for (let row of rows) {
        if (row !== null) {
            row.remove();
        }
    }
}


function createRowForResidents(residents, table) {
    for (let resident_url of residents) {
        fetch(resident_url)
            .then((response) => response.json())
            .then((contents) => {
                createRowForPerson(table, contents);
            });
    }
}


function popUpResidents(planetName, residents_url) {
    const residents_tbl = document.getElementById('people-desc');
    const modal_rows = document.querySelectorAll('.residents-row');
    const planet_name = document.getElementById('planet-name');
    planet_name.innerHTML = `Residents of ${planetName}`;
    emptyRows(modal_rows);
    createRowForResidents(residents_url, residents_tbl);
    $('.modal').modal('show');
}


function createRowsAndGetUrls(planets, list) {
    const planets_tbl = document.getElementById('planets-desc');
    const planets_rows = document.querySelectorAll('.planets');
    emptyRows(planets_rows);
    for (let planet of planets) {
                createRowForPlanet(planets_tbl, planet);
                list.push(planet['residents']);
            }
    return list;
}


function getFetch(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(contents => {
            console.log(contents);
            callback(contents);
        })
}


function loadUniverse(contents) {
    const pre_btn = document.querySelector('.previous');
    const next_btn = document.querySelector('.next');
    pre_btn.addEventListener('click', function () {
        getFetch(contents.previous, loadUniverse)
    });
    next_btn.addEventListener('click', function () {
        getFetch(contents.next, loadUniverse)
    });
    const planets = contents.results;
    let residents_url = [];
    let resident_btns;
    residents_url = createRowsAndGetUrls(planets, residents_url);
    resident_btns = document.querySelectorAll('.residents');
    const vote_btns = document.querySelectorAll('.vote');
    for (let i = 0; i < resident_btns.length; i++) {
        resident_btns[i].addEventListener('click', function() {
            popUpResidents(planets[i].name, residents_url[i])
        });
    }
    for (let i = 0; i < vote_btns.length; i++) {
        vote_btns[i].addEventListener('click', function () {
            console.log(planets[i]);
        })
    }
}


function main() {
    const planets_url = 'https://swapi.co/api/planets/';
    getFetch(planets_url, loadUniverse);
}


main();
