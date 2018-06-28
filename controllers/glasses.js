const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'respecdlocal';
const client = new pg.Client(connectionString);
client.connect();

//   connectionString: "postgres://fbarrottvccelh:03b1c75531e1281c206135c2f4e6ba97d1f70db4ef5477d45c8f58fee483eae3@ec2-23-23-245-89.compute-1.amazonaws.com:5432/deumig2doadmmi?ssl=true",//process.env.DATABASE_URL,
//   ssl: true,

function getGlasses(req, res, next) {
  console.log(process.env.DATABASE_URL);
    console.log("Inside getglasses");
    client.query('select * from glasses')
      .then(function (data) {
        console.log(data);
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL Glasses'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  function getSingleGlass(req, res, next) {
    var glassId = parseInt(req.params.glassId);
    client.query('select * from glasses where glassesid = $1', glassId)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE Glass'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  function addGlass(req, res, next) {
   console.log(req.body);
  let querystring = "insert into glasses(title, leftsphere, rightsphere, description, location, image, userid)" +
   "values ('"+req.body.title+"', "+req.body.leftsphere+", " + req.body.rightsphere+",'" +req.body.description+"','"+req.body.location+"','"+req.body.image+"',"+req.body.userid+")";
  console.log(querystring);
    client.query(querystring)
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one Glass'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  function updateGlass(req, res, next) {
    client.query('update glasses set title=$1, leftsphere=$2, rightsphere=$3, description=$4, location=$5, image=$6 where glassesid=$7',
      [req.body.title, req.body.leftsphere,req.body.rightsphere,req.body.description, req.body.location,req.body.image,
         parseInt(req.params.glassId)])
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated a Glass'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  function deleteGlass(req, res, next) {
    var glassId = parseInt(req.params.glassId);
    client.query('delete from glasses where glassesid = $1', glassId)
      .then(function (result) {
       
        res.status(200)
          .json({
            status: 'success',
            message: `Deleted ${result.rowCount} frame`
          });
        
      })
      .catch(function (err) {
        return next(err);
      });
  }

module.exports = {
    getGlasses: getGlasses,
    getSingleGlass:getSingleGlass,
    addGlass:addGlass,
    updateGlass:updateGlass,
    deleteGlass:deleteGlass
  };