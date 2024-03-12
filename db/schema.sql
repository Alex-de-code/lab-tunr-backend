-- db/schema.sql
DROP DATABASE IF EXISTS tunr_lab_dev;
CREATE DATABASE tunr_lab_dev;

\c tunr_lab_dev;

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL, 
    artist TEXT NOT NULL,
    album TEXT,
    time TEXT,
    is_favorite BOOLEAN
); 

--\d songs; 