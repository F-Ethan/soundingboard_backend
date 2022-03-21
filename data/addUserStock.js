//  -------  imports  --------
const express = require("express");
const dotenv = require("dotenv").config();
const { Console } = require("console");

var axios = require("axios").default;

const { MongoClient } = require("mongodb");

// make a call to the MongoDB database and return the information on the given stock
async function findOneStockData(client, stock) {
  const result; 
  // Check if this stock is already represented in the database
  result = await client
    .db("MyPursuit")
    .collection("stockData")
    .findOne({ symbol: stock });
  // If no result found in database check Yahoo Finance
  if (!result) {
    var options = {
      method: "GET",
      url: "https://yh-finance.p.rapidapi.com/market/v2/get-quotes",
      params: { region: "US", symbols: stock },
      headers: {
        "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
        "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("this data comes from yahoo finance");
        console.log(response.data.quoteResponse.result[0]);
        result = response.data.quoteResponse.result[0];
      })
      .catch(function (error) {
        console.error(error);
      });
  } else {
    console.log(`No listings found with the symbol '${stock}'`);
    console.log(result);
  }
  return result;
}

// Connect to the Mongo Client and retrieve the data
async function addUserStock(symbol) {
  //get URI form envrioment variable file (.env)
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    let symbolUpper = symbol.toUpperCase();

    //get the stockData on the stocks in the symbols array
    let stockData = await findOneStockData(client, symbolUpper);

    return stockData;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

module.exports = { addUserStock };
