const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'respecdlocal';
const client = new pg.Client(connectionString);
client.connect();

//   connectionString: "postgres://fbarrottvccelh:03b1c75531e1281c206135c2f4e6ba97d1f70db4ef5477d45c8f58fee483eae3@ec2-23-23-245-89.compute-1.amazonaws.com:5432/deumig2doadmmi?ssl=true",//process.env.DATABASE_URL,
//   ssl: true,
 
function getUser(req, res, next) {
    var userId = parseInt(req.params.userId);
    client.query('select * from users where userid = $1', userId)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved user details'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  function registerUser(req, res, next) {
    const bcrypt = require('bcrypt');
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        const insertUserQueryObj=  {
          text: 'insert into users(firstname, lastname, email, password) values ($1, $2, $3, $4)',
          values: [req.body.firstname, req.body.lastname, req.body.email, hash]
        }
        client.query(insertUserQueryObj)
          .then(function () {
            res.status(200)
              .json({
                status: 'success',
                message: 'Registered a User'
              });
          })
          .catch(function (err) {
            return next(err);
          });
    });
  }
  
  function updateUser(req, res, next) {
    client.query('update users set firstname=$1, lastname=$2, email=$3, password=$4 where userid=$5',
      [req.body.firstname, req.body.lastname, req.body.email,req.body.password,
         parseInt(req.params.userid)])
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated a User'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  
module.exports = {
    getUser: getUser,
    registerUser:registerUser,
    updateUser:updateUser,
};