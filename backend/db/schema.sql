CREATE DATABASE warhammer_builder_api;

CREATE TABLE todolist_users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_disgest TEXT NOT NULL
);

CREATE TABLE todolist_cards (
    id SERIAL PRIMARY KEY, 
    user_id INT NOT NULL, 
    title TEXT,  
    description TEXT,
    status TEXT, 
    due_date DATE,
    FOREIGN KEY (user_id) REFERENCES todolist_users (id) ON DELETE CASCADE
);
