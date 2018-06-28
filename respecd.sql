CREATE TABLE IF NOT EXISTS users(
   userid serial PRIMARY KEY,
   firstname VARCHAR(40),
   lastname VARCHAR(40),
   email VARCHAR(50),
   password VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS glasses(
  glassesid serial PRIMARY KEY,
  title VARCHAR(100),
  leftsphere NUMERIC (4, 2),
  rightsphere NUMERIC (4, 2),
  description VARCHAR(500),
  location VARCHAR(50),
  image VARCHAR(500),
  userid INTEGER REFERENCES users(userid)
);

CREATE TABLE IF NOT EXISTS frames(
  frameid serial PRIMARY KEY,
  title VARCHAR(100),
  description VARCHAR(500),
  location VARCHAR(50),
  image VARCHAR(500),
  userid INTEGER REFERENCES users(userid)
);

insert into users(firstname ,lastname ,email ,password ) values ('peter','marsh','ptrthegr8@gmail.com','pass');

insert into frames(title, description, location, image, userid) values ('aaa','bbbbbbbbbbbb','ccc','ddddd',1);

insert into glasses(title, leftsphere, rightsphere, description, location, image, userid)values ('mytitle', 2, 2,'dfsdfsd','dsfdsfsd','dsds',1)