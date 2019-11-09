import data_manager
import pass_hash

def add_new_user(username, password):
    hashed_password = pass_hash.hash_password(password)
    inputs = [username, hashed_password]
    data_manager.add_new_user(inputs)
