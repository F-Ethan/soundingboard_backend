//  -------  imports  --------
const express = require("express");
const dotenv = require("dotenv").config();
const { userStockData } = require("./routs/getUserStockData");
const { addUserStockData } = require("./routs/addUserStockData");
var cors = require("cors");
const { Console } = require("console");

const app = express();
const port = 3000;

app.use(cors());

//  ------- Listen on port 3000 and handle all requests   --------

//["TSLA", 'AMD', "FUV"]

// Listing for a get request and responding with data on the requested Ticker Symbol.
app.get("/", async (req, res) => {
  try {
    let response = await userStockData(req, res);
    res.send(response);
  } catch (e) {
    console.error(e);
  }
});

app.get("/newStock", async (req, res) => {
  // let response = await userStockData(req, res);
  try {
    let response = await addUserStockData(req, res);
    res.send(response);
  } catch (e) {
    console.error(e);
  }
});

// Start the Express aplication and start listening on port 3000
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
