const express = require('express');
const app = express();
var cors = require('cors');
var router = express.Router();
const frames = require("./controllers/frames");
const glasses = require("./controllers/glasses");
const login = require("./controllers/login");
const user = require("./controllers/user");
const config = null;
process.env.NODE_ENV !== 'production' ? config = require('./config') : null;
// image upload stuff
const AWS = require("aws-sdk");
const multer = require('multer');
const multerS3 = require('multer-s3');
//
app.use(cors());
app.use(express.json());

//variables used to access amazon cloud bucket
AWS.config.update({
  accessKeyId: process.env.S3_KEY || config.IAM_USER_KEY,
  secretAccessKey: process.env.S3_SECRET || config.IAM_USER_SECRET,
  region: 'us-east-2'
});

const s3 = new AWS.S3();

// Adding the uploaded photos to our Amazon S3 bucket
const imageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: function (req, file, cb) {
      const filename = `${Date.now().toString()}--${file.originalname}`
      cb(null, filename)
    }
  })
});

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
app.post('/glasses', imageUpload.single('pic'), glasses.addGlass);
app.put('/glasses/:glassId', glasses.updateGlass);
app.delete('/glasses/:glassId', glasses.deleteGlass);

app.get('/frames', frames.getFrames);
app.get('/frames/:frameId', frames.getSingleFrame);
app.post('/frames', frames.addFrame);
app.put('/frames/:frameId', frames.updateFrame);
app.delete('/frames:frameId', frames.deleteFrame);

app.get('/test', (req, res) => res.send('<h1><marquee>Re-Spec\'d Testtttttt!</marquee></h1>'));


app.listen(port, function() {
  console.log("Listening on " + port);
});
