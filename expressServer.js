'use strict';
//EXPRESS allows us to deploy the website 
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8001; // port that Express will listen to for requests

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

// const DATABASE_URL = process.env.DATABASE_URL;
const dbConn = require('./dbConn');
const pool = dbConn.getPool();


  
app.get('/api/onepiece', (req, res, next) => {
    // Get all the rows in onepiece table
    pool.query('SELECT * FROM onepiece', (err, result) => {
      if (err){
        return next(err);
      }
      
      const rows = result.rows;
    //   console.log(rows);
      return res.send(rows);
    });
});

//NOW CREATE A GET REQUEST FOR ONE ELEMENT OUT YOUR TABLE MY GUY
app.get('/api/onepiece/:id', (req, res, next) => {
  // Get a single pirate from the table
  let id = Number.parseInt(req.params.id);
  if (!Number.isInteger(id)){
    res.status(404).send("No pirate found with that ID");
  }
  console.log("pirate ID: ", id);

  pool.query('SELECT * FROM onepiece WHERE id = $1', [id], (err, result) => {
    if (err){
      return next(err);
    }

    let pirate = result.rows[0];
    console.log("Single Pirate ID", id, "values:", pirate);
    if (pirate){
      return res.send(pirate);
    } else {
      return res.status(404).send("No pirate found with that ID");
    }
  });
});

//POST SECTION is teh CREATE PART OF CRUD we are adding data
//THE GET REQS WERE THE READ, this is due to using pool query

app.post('/api/onepiece', (req, res, next) => {
  const age = Number.parseInt(req.body.age);
  const {name, devilfruit} = req.body;//these are strings thats y we set them apart in the body request
  console.log("Request body name, devilfruit, age", name, devilfruit, age);
  // check request data - if everything exists and id is a number
  if (name && devilfruit && age){
    pool.query('INSERT INTO onepiece (name, devilfruit, age) VALUES ($1, $2, $3) RETURNING *', [name, devilfruit, age], (err, data) => {
      const pirates = data.rows[0];
      console.log("Pirates: ", pirates);
      if (pirates){
        return res.send(pirates);
      } else {
        return next(err);
      }
    });

  } else {
    return res.status(400).send("Unable to create pirate from request body");
  }

});

//Now this section is the patch of CRUD











//This is DELETE of CRUD

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Listening on port', port);
    console.log("Connecting to postgres pool: ", pool);
});
  