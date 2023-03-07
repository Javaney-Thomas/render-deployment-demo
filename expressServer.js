'use strict';

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
  // Get a single person from the table
  let id = Number.parseInt(req.params.id);
  if (!Number.isInteger(id)){
    res.status(404).send("No person found with that ID");
  }
  console.log("person ID: ", id);

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



app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Listening on port', port);
    console.log("Connecting to postgres pool: ", pool);
});
  