CREATE DATABASE jwttutorial;

create table users
(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
)

insert into users
    (user_name, user_email, user_password)
values
    ('Manas', 'manas@gmail.com', 'manas123');