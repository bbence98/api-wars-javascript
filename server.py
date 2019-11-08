from flask import Flask, request, render_template, url_for, session, redirect
import pass_hash
import data_manager

app = Flask(__name__)


@app.route('/')
def homepage():
    return render_template('index.html')


@app.route('/registration', methods=['GET', 'POST'])
def register_user():
    if request.method == 'POST':
        user_name = request.form.get('username')
        if pass_hash.check_if_user_name_exists(user_name):
            return redirect(url_for('register_user'))
        password = request.form.get('password')
        hashed_password = pass_hash.hash_password(password)
        inputs = [user_name, hashed_password]
        data_manager.add_new_user(inputs)
        return redirect(url_for('homepage'))

    return render_template('registration.html')


if __name__ == '__main__':
    app.run()