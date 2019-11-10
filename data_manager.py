import connection

@connection.connection_handler
def add_new_user(cursor, user_input):
    next_id = get_next_user_id()
    cursor.execute("""
                    INSERT INTO users (id, username, password)
                        VALUES (%(id)s, %(username)s, %(pw)s);
                        """,
               {'id' : next_id,
                'username': user_input[0],
                'pw': user_input[1]})


@connection.connection_handler
def get_next_user_id(cursor):
    cursor.execute("""
                    SELECT MAX(id) FROM users;""")
    id_ = cursor.fetchall()
    next_id = id_[0].get('max') + 1
    return next_id


@connection.connection_handler
def get_existing_users(cursor):
    cursor.execute("""
                    SELECT username FROM users""")
    user_names = cursor.fetchall()
    return user_names


@connection.connection_handler
def get_existing_users_with_password(cursor):
    cursor.execute("""
                    SELECT username, password FROM users""")
    data = cursor.fetchall()
    return data


@connection.connection_handler
def get_password(cursor, username):
    cursor.execute("""
                    SELECT password FROM users
                    WHERE username = %(username)s;
                    """,
                   {'username' : username})
    password = cursor.fetchall()
    return password

