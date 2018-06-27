

const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://fbarrottvccelh:03b1c75531e1281c206135c2f4e6ba97d1f70db4ef5477d45c8f58fee483eae3@ec2-23-23-245-89.compute-1.amazonaws.com:5432/deumig2doadmmi",//process.env.DATABASE_URL,
  ssl: true,
});
 
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
  
//   function getSingleFrame(req, res, next) {
//     var frameId = parseInt(req.params.framid);
//     db.one('select * from frames where frameid = $1', frameId)
//       .then(function (data) {
//         res.status(200)
//           .json({
//             status: 'success',
//             data: data,
//             message: 'Retrieved ONE Frame'
//           });
//       })
//       .catch(function (err) {
//         return next(err);
//       });
//   }
  
//   function addFrame(req, res, next) {
//     req.body.age = parseInt(req.body.age);
//     db.none('insert into frames(title, description, location, image, userid)' +
//         'values(${title}, ${description}, ${location}, ${image}, ${userid})',
//       req.body)
//       .then(function () {
//         res.status(200)
//           .json({
//             status: 'success',
//             message: 'Inserted one Frame'
//           });
//       })
//       .catch(function (err) {
//         return next(err);
//       });
//   }
  
//   function updateFrame(req, res, next) {
//     db.none('update frames set title=$1, description=$2, location=$3, image=$4 where id=$5',
//       [req.body.title, req.body.description, req.body.location,req.body.image,
//          parseInt(req.params.frameId)])
//       .then(function () {
//         res.status(200)
//           .json({
//             status: 'success',
//             message: 'Updated a Frame'
//           });
//       })
//       .catch(function (err) {
//         return next(err);
//       });
//   }
  
//   function removeFrame(req, res, next) {
//     var frameId = parseInt(req.params.frameId);
//     db.result('delete from frames where frameid = $1', frameId)
//       .then(function (result) {
//         /* jshint ignore:start */
//         res.status(200)
//           .json({
//             status: 'success',
//             message: `Removed ${result.rowCount} frame`
//           });
//         /* jshint ignore:end */
//       })
//       .catch(function (err) {
//         return next(err);
//       });
//   }

module.exports = {
    getFrames: getFrames
   
  };