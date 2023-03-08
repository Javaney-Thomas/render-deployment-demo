'use strict';
//EXPRESS allows us to set up a webserver with nodejs
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


  
app.get('/api/onepiece', (req, res, next) => {//next tells us that we will use additonal middleware
    // Get all the rows in onepiece table
    pool.query('SELECT * FROM onepiece', (err, result) => {//async callback
      if (err){
        return next(err);
      }
      
      const rows = result.rows;
    //   console.log(rows);
      return res.send(rows);
    });
});

//NOW CREATE A GET REQUEST FOR ONE ELEMENT OUT YOUR TABLE MY GUY
app.get('/api/onepiece/:id', (req, res, next) => {//pool is basically a pipeline tht connects us to our pg DB
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
    return res.status(400).send("Unable to create pirates from request body");
  }

});

//Now this section is the patch of CRUD
app.patch('/api/onepiece/:id', (req, res, next) => {
  // parse id from URL
  const id = Number.parseInt(req.params.id);
  // get data from request body
  const age = Number.parseInt(req.body.age);
  const {name, devilfruit} = req.body;
  // if id input is ok, make DB call to get existing values
  if (!Number.isInteger(id)){
    res.status(400).send("No pirates found with that ID");
  }
  console.log("Pirates: ", id);
  // get current values of the pet with that id from our DB
  pool.query('SELECT * FROM onepiece WHERE id = $1', [id], (err, result) => {
    if (err){
      return next(err);
    }
    console.log("request body name, devilfruit, age: ", name, devilfruit, age);
    const pirates = result.rows[0];
    console.log("Single pirates ID from DB", id, "values:", pirates);
    if (!pirates){
      return res.status(404).send("No pirate found with that ID");
    } else {
      // check which values are in the request body, otherwise use the previous pet values
      // let updatedName = null; 
      const updatedName = name || pirates.name; 

      //longer version
      // if (name){
      //   updatedName = name;
      // } else {
      //   updatedName = ship.name;
      // }

      const updatedDevilfruit = devilfruit || pirates.devilfruit;
      const updatedAge = age || pirates.age;

      pool.query('UPDATE pirates SET name=$1, kind=$2, manufacturer=$3 WHERE id = $4 RETURNING *', 
          [updatedName, updatedType, updatedManufacturer, id], (err, data) => {

        if (err){
          return next(err);
        }
        const updatedPirate = data.rows[0];
        console.log("updated row:", updatedPirate);
        return res.send(updatedPirate);
      });
    }
  });
});


//This is DELETE of CRUD
app.delete('/api/onepiece/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  if (!Number.isInteger(id)){
    return res.status(400).send("No pirate found with that ID");
  }

  pool.query('DELETE FROM onepiece WHERE id = $1 RETURNING *', [id], (err, data) => {
    if (err){
      return next(err);
    }
    const deletedPirate = data.rows[0];
    console.log(deletedPirate);
    if (deletedPirate){
      // respond with deleted row
      res.send(deletedPirate);
    } else {
      res.status(404).send("No pirate found with that ID");
    }
  });
});



app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Listening on port', port);
    console.log("Connecting to postgres pool: ", pool);
});
  