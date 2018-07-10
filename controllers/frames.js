const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'respecdlocal';
const client = new pg.Client(connectionString);
client.connect();


function getFrames(req, res, next) {
  console.log(process.env.DATABASE_URL);
    console.log("Inside getframes");
    client.query('select * from frames')
      .then(function (data) {
        console.log(data);
        res.status(200)
          .json({
            status: 'success',
            data: data.rows,
            message: 'Retrieved ALL Frames'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  function getSingleFrame(req, res, next) {
    var frameId = parseInt(req.params.frameId);
    client.query('Select f.*, u.email from frames f , users u where f.userid = u.userid and f.frameid = $1;', [frameId])
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data.rows,
            message: 'Retrieved ONE Frame'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  function addFrame(req, res, next) {
    console.log("Body before insert ", req.body);
    const queryObj = {
      text: 'insert into frames(title,condition,description, location, image, userid) values ($1, $2, $3, $4, $5, $6)',
      values: [req.body.title,req.body.condition, req.body.description, req.body.location, req.file?req.file.location:'Noimage', req.body.userid]
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
    client.query('update frames set title=$1, condition=$2, description=$2, location=$4, image=$5 where frameid=$6',
      [req.body.title, req.body.condition, req.body.description, req.body.location,req.body.image,
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