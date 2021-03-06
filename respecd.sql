DROP TABLE GLASSES;
DROP TABLE FRAMES;
DROP TABLE USERS;

CREATE TABLE IF NOT EXISTS users(
   userid serial PRIMARY KEY,
   firstname VARCHAR(40) NOT NULL,
   lastname VARCHAR(40) NOT NULL,
   email VARCHAR(50) UNIQUE NOT NULL ,
   password VARCHAR(200) NOT NULL,
   created_on TIMESTAMP NOT NULL DEFAULT Now(),
   lastlogin TIMESTAMP
);

CREATE TABLE IF NOT EXISTS glasses(
  glassesid serial PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  leftsphere NUMERIC (4, 2),
  rightsphere NUMERIC (4, 2),
  leftcylinder NUMERIC (4, 2),
  rightcylinder NUMERIC (4, 2),
  rightaxis INTEGER,
  leftaxis INTEGER,
  add NUMERIC (4, 2),
  description VARCHAR(500),
  condition INTEGER,
  location VARCHAR(50),
  image VARCHAR(500),
  userid INTEGER REFERENCES users(userid),
  
);

CREATE TABLE IF NOT EXISTS frames(
  frameid serial PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(500),
  condition INTEGER,
  location VARCHAR(50),
  image VARCHAR(500),
  latitude FLOAT,
  longitude FLOAT,
  userid INTEGER REFERENCES users(userid)
);

