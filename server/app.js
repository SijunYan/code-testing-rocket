const dbPool = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
  host: "host.docker.internal",
  user: "spaceman",
  password: "vacuum",
  database: "mission-control",
});

connection.connect();
connection.query("SELECT * FROM spaceData", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});
connection.end();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const rows = await dbPool.query("SELECT * FROM spaceData");
  res.status(200);
  res.send({
    result: JSON.stringify(rows),
  });
});

// get all capsules: sort by original_launch
app.get("/capsules", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.spacexdata.com/v3/capsules?sort=original_launch"
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get landing pad
app.get("/landingpad/:id", async (req, res) => {
  try {
    const requestId = req.params.id;
    //check in database

    // not in database
    const response = await axios.get(
      `https://api.spacexdata.com/v3/landpads/${requestId}`
    );
    const { id, full_name, status, location } = response.data;
    const returnData = { id, full_name, status, location };
    //store in databas

    // send back
    res.status(200).json(returnData);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen("4000");
console.log(
  `Listening on port: 4000, wait for the development server to be up...`
);
