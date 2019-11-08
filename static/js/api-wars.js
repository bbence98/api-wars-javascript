function createCell(tr, data) {
    const td = document.createElement('td');
    td.innerHTML = data;
    tr.appendChild(td)
}


function createRowForPlanets(tbl, data) {
    const tr = document.createElement('tr');
    tr.className = 'planets';
    createCell(tr, data['name']);
    createCell(tr, data['diameter']);
    createCell(tr, data['climate']);
    createCell(tr, data['terrain']);
    createCell(tr, data['surface_water']);
    createCell(tr, data['population']);
    createCell(tr, `<button type="button" class="residents">${data['residents'].length} Residents</button>`);
    tbl.appendChild(tr)
}


function createRowForPeople(tbl, data) {
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
    tbl.appendChild(tr)
}


function emptyRows(rows) {
    for (let row of rows) {
        if (row != null) {
            row.remove()
        }
    }
}


function main() {
    const planets_url = 'https://swapi.co/api/planets/';
    const planets_tbl = document.getElementById('planets-desc');
    const people_tbl = document.getElementById('people-desc');
    const login_btn = document.querySelector('#login');
    login_btn.addEventListener('click', function () {
        alert("pressed")
    });

    fetch(planets_url)
        .then((response) => response.json())
        .then((contents) => {
            const planets = contents.results;
            let residents_url = [];
            let resident_btns = document.createDocumentFragment().childNodes; // creating empty NodeList
            for (let planet of planets) {
                createRowForPlanets(planets_tbl, planet);
                residents_url.push(planet['residents']);
                resident_btns = document.querySelectorAll('.residents');
            }
            for (let i = 0; i < resident_btns.length; i++) {
                resident_btns[i].addEventListener('click', function () {
                    const modal_rows = document.querySelectorAll('.residents-row');
                    const planet_name = document.getElementById('planet-name');
                    planet_name.innerHTML = `Residents of ${planets[i].name}`;
                    emptyRows(modal_rows);
                    $('.modal').modal('show');
                    for (let resident_url of residents_url[i]) {
                        fetch(resident_url)
                            .then((response) => response.json())
                            .then((contents) => {
                                createRowForPeople(people_tbl, contents)
                            });
                    }
                });
            }
        })
}


main();
