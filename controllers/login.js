const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'respecdlocal';
const client = new pg.Client(connectionString);
client.connect();

function loginUser(req, res, next) {
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

module.exports = {
    loginUser: loginUser
}