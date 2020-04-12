const express = require('express');
const mysql = require('mysql');

//Create Connection
const db = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : '@Ss4gogeta',
  database  : 'reservations'
});

//Connect
db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('MySQL connected...');
})

const app = express();

app.get('/api/allstats', (req, res) => {
  let sql = "select * from reservation";
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

app.get('/api/insert/:name/:partySize', (req, res) => {
  let sql = `INSERT INTO reservation SET name = "${req.params.name}", partySize= ${req.params.partySize}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

app.get('/api/update/:name/:partySize', (req, res) => {
  let sql = `UPDATE reservation SET partySize = ${req.params.partySize} WHERE name="${req.params.name}"`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

app.get('/api/remove/:name', (req, res) => {
  let sql = `DELETE FROM reservation WHERE name="${req.params.name}"`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

app.get('/api/deleteElement/', (req, res) => {
  let sql = "DELETE FROM reservation ORDER BY id ASC LIMIT 1";
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

app.listen('5000', () => {
  console.log('Server started on port 5000');
});
