create TABLE user(id SERIAL PRIMARY KEY,first_name VARCHAR(255),last_name VARCHAR(255),phone INTEGER);

create TABLE doctor(id SERIAL PRIMARY KEY,first_name VARCHAR(255),last_name VARCHAR(255),spec VARCHAR(255));

create TABLE timeslot(id SERIAL PRIMARY KEY,doctor_id INTEGER,person_id INTEGER,time_start TIMESTAMP,time_end TIMESTAMP,FOREIGN KEY (doctor_id) REFERENCES doctor (id),FOREIGN KEY (person_id) REFERENCES person (id));