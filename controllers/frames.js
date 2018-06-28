const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'respecdlocal';
const client = new pg.Client(connectionString);
client.connect();

//   connectionString: "postgres://fbarrottvccelh:03b1c75531e1281c206135c2f4e6ba97d1f70db4ef5477d45c8f58fee483eae3@ec2-23-23-245-89.compute-1.amazonaws.com:5432/deumig2doadmmi?ssl=true",//process.env.DATABASE_URL,
//   ssl: true,

function getFrames(req, res, next) {
  console.log(process.env.DATABASE_URL);
    console.log("Inside getframes");
    client.query('select * from frames')
      .then(function (data) {
        console.log(data);
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL Frames'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  function getSingleFrame(req, res, next) {
    var frameId = parseInt(req.params.frameId);
    client.query('select * from frames where frameid = $1', [frameId])
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE Frame'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  function addFrame(req, res, next) {
    const queryObj = {
      text: 'insert into frames(title, description, location, image, userid) values ($1, $2, $3, $4, $5)',
      values: [req.body.title, req.body.description, req.body.location, req.body.image, req.body.userid]
    }
    client.query(queryObj)
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one Frame'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  function updateFrame(req, res, next) {
    client.query('update frames set title=$1, description=$2, location=$3, image=$4 where frameid=$5',
      [req.body.title, req.body.description, req.body.location,req.body.image,
         parseInt(req.params.frameId)])
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated a Frame'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  function deleteFrame(req, res, next) {
    var frameId = parseInt(req.params.frameId);
    client.query('delete from frames where frameid = $1', [frameId])
      .then(function (result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Deleted ${result.rowCount} frame`
          });
        /* jshint ignore:end */
      })
      .catch(function (err) {
        return next(err);
      });
  }

module.exports = {
    getFrames: getFrames,
    getSingleFrame:getSingleFrame,
    addFrame:addFrame,
    updateFrame:updateFrame,
    deleteFrame:deleteFrame
};