from flask import Flask, request, render_template, url_for, session, redirect
import pass_hash
import subfunctions

app = Flask(__name__)


@app.route('/')
def homepage():
    return render_template('index.html')


@app.route('/registration', methods=['GET', 'POST'])
def register_user():
    if request.method == 'POST':
        user_name = request.form.get('username')
        if pass_hash.check_if_user_name_exists(user_name):
            message = 'Name is already taken'
            return render_template('registration.html', message=message)
        password = request.form.get('password')
        subfunctions.add_new_user(user_name, password)
        return redirect(url_for('homepage'))

    return render_template('registration.html')


if __name__ == '__main__':
    app.run()