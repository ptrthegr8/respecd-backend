const express = require('express');
const app = express();
var cors = require('cors');
var router = express.Router();
const frames = require("./controllers/frames");
const glasses = require("./controllers/glasses");
const login = require("./controllers/login");
const user = require("./controllers/user");
const passport = require('passport');
app.use(cors());
app.use(express.json());

require('./controllers/passport')(passport);  
app.use(passport.initialize());  


const port = process.env.PORT || 3000;

app.post('/register', user.registerUser);
app.post('/login', login.loginUser);
app.get('/logout', login.logoutUser);

app.get('/glasses',passport.authenticate('jwt', { session: false }), glasses.getGlasses);
app.get('/glasses/:glassId', glasses.getSingleGlass);
app.post('/glasses', glasses.addGlass);
app.put('/glasses/:glassId', glasses.updateGlass);
app.delete('/glasses/:glassId', glasses.deleteGlass)

app.get('/frames', frames.getFrames);
app.get('/frames/:frameId', frames.getSingleFrame);
app.post('/frames', frames.addFrame);
app.put('/frames/:frameId', frames.updateFrame);
app.delete('/frames:frameId', frames.deleteFrame);

app.get('/test', (req, res) => res.send('<h1><marquee>Re-Spec\'d Testtttttt!</marquee></h1>'));

app.listen(port, function() {
  console.log("Listening on " + port);
});
