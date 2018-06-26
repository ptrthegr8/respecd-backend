const express = require('express');
const app = express();
const pg = require('pg');

app.use(express.logger());
app.get('/', (req, res) => res.send('<h1><marquee>Re-Spec\'d!</marquee></h1>'));

const port = process.env.PORT || 3000;
    app.listen(port, function() {
      console.log("Listening on " + port);
    });
    
app.post('/register', function(request, response) {
      console.log("Request Body",request); 
      response.send('Hello World!'+request.body);
    });
   
// pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM GLASSES', function(err, result) {
//         done();
//         if(err) return console.error(err);
//         console.log(result.rows);
//       });
// });    