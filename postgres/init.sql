create sequence key_value_sequence;

create table key_value(
    id INT PRIMARY KEY,
    key varchar(255) NOT NULL,
    value varchar(255) NOT NULL
);
