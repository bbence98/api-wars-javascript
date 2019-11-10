from flask import Flask, request, render_template, url_for, session, redirect
import pass_hash
import subfunctions
import data_manager

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route('/')
def homepage():
    return render_template('index.html')


@app.route('/registration', methods=['GET', 'POST'])
def register_user():
    label_0 = 'Registration'
    label_1 = 'Register'
    if request.method == 'POST':
        user_name = request.form.get('username')
        if pass_hash.check_if_user_name_exists(user_name):
            error_message = 'Name is already taken'
            return render_template('reg_log.html', error_message=error_message, label_0=label_0, label_1=label_1)
        else:
            password = request.form.get('password')
            subfunctions.add_new_user(user_name, password)
            return redirect(url_for('login'))
    return render_template('reg_log.html', label_0=label_0, label_1=label_1)


@app.route('/login', methods=['POST', 'GET'])
def login():
    label_0 = 'Log in'
    error_message = 'Incorrect username or password'
    if request.method == 'GET':
        return render_template('reg_log.html', label_0=label_0)
    input_password = request.form.get('password')
    input_username = request.form.get('username')
    password = data_manager.get_password(input_username)
    try:
        password = password[0].get('password')
    except IndexError:
        return render_template('reg_log.html', error_message=error_message, label_0=label_0)
    verification = pass_hash.verify_password(input_password, password)
    if verification:
        session['username'] = request.form['username']
        session['password'] = request.form['password']
        return redirect(url_for('homepage'))
    else:
        return render_template('reg_log.html', error_message=error_message, label_0=label_0)



@app.route('/logout')
def logout():
    session.pop('username')
    return redirect(url_for('homepage'))


@app.route('/save-vote')
def save_vote():
    vote = 1
    print('vote : ', vote)
    return vote


if __name__ == '__main__':
    app.run()