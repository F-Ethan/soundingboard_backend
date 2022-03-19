//  -------  imports  --------
const express = require("express");
const dotenv = require("dotenv").config();
const { userStockData } = require("./routs/getUserstockData");
var cors = require("cors");
const { Console } = require("console");

const app = express();
const port = 3000;

app.use(cors());

//  ------- Listen on port 3000 and handle all requests   --------

//["TSLA", 'AMD', "FUV"]

// Listing for a get request and responding with data on the requested Ticker Symbol.
app.get("/", async (req, res) => {
  let response = await userStockData(req, res);
  res.send(response);
});

app.get("/newStock", async (req, res) => {
  // let response = await userStockData(req, res);
  res.send(" my response");
});

// Start the Express aplication and start listening on port 3000
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
