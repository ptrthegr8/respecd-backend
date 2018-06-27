const express = require('express');
const app = express();
const pg = require('pg');
var cors = require('cors');
var router = express.Router();

const frames = require("./controllers/frames");
const glasses = require("./controllers/glasses");
const login = require("./controllers/login");
const user = require("./controllers/user");
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => res.send('<h1><marquee>Re-Spec\'d!</marquee></h1>'));


const port = process.env.PORT || 3000;
    app.listen(port, function() {
      console.log("Listening on " + port);
    });
//Will be removed 
app.post('/registeration', function(req, res) {
  console.log("inside",  req.body)
  var user_id = req.body.username;
  // var token = req.body.password;
  // var dname = req.body.displayName;

  res.json(user_id /*+ ' ' + token + ' ' + dname*/);
});

// router.post('/register', user.registerUser);
// router.get('/login', user.loginUser);

// router.get('/glasses', glasses.getGlasses);
// router.post('/glasses', glasses.addGlass);
// router.put('/glasses', glasses.upadateGlass);
// router.delete('/glasses', glasses.deleteGlass)

app.get('/frames', frames.getFrames);
// router.post('/frames', frames.addFrame);
// router.put('/frames', frames.updateFrame);
// router.delete('/frames', frames.deleteFrame);

// pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM GLASSES', function(err, result) {
//         done();
//         if(err) return console.error(err);
//         console.log(result.rows);
//       });
// });    