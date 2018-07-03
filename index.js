const express = require('express');
const app = express();
var cors = require('cors');
var router = express.Router();
const frames = require("./controllers/frames");
const glasses = require("./controllers/glasses");
const login = require("./controllers/login");
const user = require("./controllers/user");
// image upload stuff
const AWS = require("aws-sdk");
const multer = require('multer');
const multerS3 = require('multer-s3');
//
app.use(cors());
app.use(express.json());

//variables used to access amazon cloud bucket
const BUCKET_NAME = 'respecd';
const IAM_USER_KEY = 'AKIAI5VSK6BGQJ6L4HJQ';
const IAM_USER_SECRET = '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';

const s3 = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
  Bucket: BUCKET_NAME
});
// Adding the uploaded photos to our Amazon S3 bucket
const imageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'respecd',
    metadata: function (req, file, cb) {
      const filename = `${Date.now().toString()}--${file.originalname}`
      // if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
      //   return cb(new Error('Only image files are allowed!'), false);
      // }
      cb(null, filename)
    }
  })
});

// const { Client } = require('pg');
// const connectionString = process.env.DATABASE_URL || 'respecdlocal';
// const client = new Client(connectionString);
  //({"postgres://fbarrottvccelh:03b1c75531e1281c206135c2f4e6ba97d1f70db4ef5477d45c8f58fee483eae3@ec2-23-23-245-89.compute-1.amazonaws.com:5432/deumig2doadmmi?ssl=true",
  //connectionString: process.env.DATABASE_URL,
  // ssl: true,})
  
// client.connect();

const port = process.env.PORT || 3000;

app.post('/register', user.registerUser);
app.post('/login', login.loginUser);
app.get('/logout', login.logoutUser);

app.get('/glasses', glasses.getGlasses);
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
