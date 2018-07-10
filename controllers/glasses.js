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
            data: data.rows,
            message: 'Retrieved ALL Glasses'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  function getSingleGlass(req, res, next) {
    var glassId = parseInt(req.params.glassId);
    client.query('Select g.*, u.email from glasses g , users u where g.userid = u.userid and g.glassesid = $1', [glassId])

      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data.rows,
            message: 'Retrieved ONE Glass'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  function addGlass(req, res, next) {
    console.log("req.body",req.body);
    //console.log(req.file.location);// This is the url for image stored in aws which we will store in the database
    const queryObj = {
    text: "insert into glasses(title, leftsphere, rightsphere, leftcylinder, rightcylinder, rightaxis, leftaxis, add, description, condition, location, image, userid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)", 
    values: [req.body.title, req.body.leftsphere, req.body.rightsphere, req.body.leftcylinder, req.body.rightcylinder, req.body.rightaxis, req.body.leftaxis, req.body.add, req.body.description, req.body.condition, req.body.location,req.file?req.file.location:'', req.body.userid]
    }
    client.query(queryObj)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Inserted one Glass'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  function updateGlass(req, res, next) {
    const queryObj = {
      text: 'update glasses set title=$1, leftsphere=$2, rightsphere=$3, leftcylinder=$4, rightcylinder=$5, rightaxis=$6, leftaxis=$7, add=$8, description=$9, condition=$10 location=$11, image=$12 where glassesid=$13',
      values: [req.body.title, req.body.leftsphere, req.body.rightsphere, req.body.leftcylinder, req.body.rightcylinder, req.body.rightaxis, req.body.leftaxis, req.body.add, req.body.description, req.body.condition, req.body.location, /*req.file.location*/"",
        parseInt(req.params.glassId)]
    }
    client.query(queryObj)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Updated a Glass'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  function deleteGlass(req, res, next) {
    var glassId = parseInt(req.params.glassId);
    client.query('delete from glasses where glassesid = $1', [glassId])
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