const express = require('express');
const app = express();
const pg = require('pg');
var cors = require('cors');
 
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.send('<h1><marquee>Re-Spec\'d!</marquee></h1>'));

const port = process.env.PORT || 3000;
    app.listen(port, function() {
      console.log("Listening on " + port);
    });

app.post('/register', function(req, res) {
  console.log("inside",  req.body)
  var user_id = req.body.username;
  // var token = req.body.password;
  // var dname = req.body.displayName;

  res.send(user_id /*+ ' ' + token + ' ' + dname*/);
});
   
// pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM GLASSES', function(err, result) {
//         done();
//         if(err) return console.error(err);
//         console.log(result.rows);
//       });
// });    