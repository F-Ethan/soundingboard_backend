//  -------  imports  --------
const express = require("express");
const dotenv = require("dotenv").config();
const { Console } = require("console");

const { makeStockObject } = require("../components/StockObject");

var axios = require("axios").default;

const { MongoClient } = require("mongodb");

// Send the Yahoo stock data object to mongodb
async function addOneObject(client, stockData) {
  try {
    const result = await client
      .db("MyPursuit")
      .collection("stockData")
      .insertOne(stockData);
    console.log(`Inserted Document '${stockData.symbol}'`);
    console.log(result);
  } catch (e) {
    console.error(e);
  }
}

// make a call to the MongoDB database and return the information on the given stock
async function findOneStockData(client, stock) {
  // Check if this stock is already represented in the database
  rawResult = await client
    .db("MyPursuit")
    .collection("stockData")
    .findOne({ symbol: stock });
  // If no result found in database check Yahoo Finance
  if (!rawResult) {
    // Obect containing the parmaaters being sent via a get request to Yahoo finance
    var options = {
      method: "GET",
      url: "https://yh-finance.p.rapidapi.com/market/v2/get-quotes",
      params: { region: "US", symbols: stock },
      headers: {
        "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
        "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      },
    };

    // Sending the request and saving the respons as rawResult
    rawResult = await axios
      .request(options)
      .then(function (response) {
        // console.log("this data comes from yahoo finance");
        // console.log(response.data.quoteResponse.result[0]);
        return response.data.quoteResponse.result[0];
      })
      .catch(function (error) {
        console.error(error);
      });

    console.log(rawResult);
    if (rawResult) {
      // Add the new stock data to MongoDB for future tracking
      await addOneObject(client, rawResult);
    } else {
      result = {
        errorMessage:
          "Sorry there seems to be something wrong, Please verify that you have the right ticker symbol and try again. If the issue persists please reach out to constumer serviece.",
        resultStatus: 404,
      };
    }
  }

  //parsing out rawResult to match the objects being sent to the front end.
  result = makeStockObject(rawResult);
  // console.log(result);
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
