const express = require('express');
const app = express();
var cors = require('cors');
var router = express.Router();
const frames = require("./controllers/frames");
const glasses = require("./controllers/glasses");
const login = require("./controllers/login");
const user = require("./controllers/user");
app.use(cors());
app.use(express.json());

// const { Client } = require('pg');
// const connectionString = process.env.DATABASE_URL || 'respecdlocal';
// const client = new Client(connectionString);
  //({"postgres://fbarrottvccelh:03b1c75531e1281c206135c2f4e6ba97d1f70db4ef5477d45c8f58fee483eae3@ec2-23-23-245-89.compute-1.amazonaws.com:5432/deumig2doadmmi?ssl=true",
  //connectionString: process.env.DATABASE_URL,
  // ssl: true,})
  
// client.connect();

const port = process.env.PORT || 3000;

app.post('/register', user.registerUser);
app.get('/login', login.loginUser);

app.get('/glasses', glasses.getGlasses);
app.post('/glasses', glasses.addGlass);
app.put('/glasses', glasses.updateGlass);
app.delete('/glasses', glasses.deleteGlass)

app.get('/frames', frames.getFrames);
app.post('/frames', frames.addFrame);
app.put('/frames', frames.updateFrame);
app.delete('/frames', frames.deleteFrame);

app.get('/test', (req, res) => res.send('<h1><marquee>Re-Spec\'d!</marquee></h1>'));
// app.get('/framesnew', (req, res)=> {
//     client.query('SELECT * FROM Frames', function(err, result) {
//         if(err) return console.error(err);
//         console.log(result.rows);
//       });
// });  

app.listen(port, function() {
  console.log("Listening on " + port);
});