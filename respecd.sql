CREATE TABLE IF NOT EXISTS users(
    userid serial PRIMARY KEY,
    firstname VARCHAR(40),
    lastname VARCHAR(40),
    email VARCHAR(50),
    password chkpass
);

CREATE TABLE IF NOT EXISTS glasses(
   glassesid serial PRIMARY KEY,
   title VARCHAR(100),
   left NUMERIC (2, 2),
   right NUMERIC (2, 2),
   desc VARCHAR(500),
   location VARCHAR(50),
   image VARCHAR(500),
   userid INTEGER REFERENCES users(userid)
)

CREATE TABLE IF NOT EXISTS frames(
   frameid serial PRIMARY KEY,
   title VARCHAR(100),
   desc VARCHAR(500),
   location VARCHAR(50),
   image VARCHAR(500),
   userid INTEGER REFERENCES users(userid)
)
