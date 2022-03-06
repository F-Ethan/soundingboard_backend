//  -------  imports  --------
const express = require("express");
// const data = require('./data')
// const fs = require('fs');
// const path = require('path');
var cors = require("cors");
const { Console } = require("console");

const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

app.use(cors());

//  -------  MongoDB database  --------

// make a call to the MongoDB database and return all the information on the given stock
async function findStockData(client, stocks) {
  const cursor = await client
    .db("MyPursuit")
    .collection("stockData")
    .find({ symbol: { $in: stocks } });
  const results = await cursor.toArray();
  // if (results) {
  //     console.log(`Found a listing in the collection with the symbol '${stocks}':`);
  //     results.forEach(result => console.log(result))
  //     // results.forEach(result => console.log(result.symbol))
  //   } else {
  //     console.log(`No listings found with the symbol '${stocks}'`);
  //     console.log(results);
  // }
  return results;
}

// make a call to the MongoDB database and return all the information on the given stock
async function findUserStockData(client, username) {
  const results = await client
    .db("MyPursuit")
    .collection("userStockData")
    .findOne({ username: username });

  if (results) {
    console.log(
      `Found a listing in the collection with the symbol '${username}':`
    );
    console.log(results);
  } else {
    console.log(`No listings found with the username '${username}'`);
    console.log(results);
  }
  return results;
}

// Connect to the Mongo Client and retrieve the data
async function main(username) {
  const uri =
    "mongodb+srv://fethanerrier:Stronger88@cluster0.664pc.mongodb.net/MYPURSUIT?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // get userStockData using the provided username
    let userStockData = await findUserStockData(client, username);
    console.log(userStockData);
    // make symbols array from data stored in userStockData
    let symbols = [];
    userStockData.stocksData.forEach((stock) => symbols.push(stock.symbol));

    //get the stockData on the stocks in the symbols array
    let stockData = await findStockData(client, symbols);

    //results objet with userStockdata and stockData
    let results = {
      stockData,
      userStockData,
    };

    return results;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

//  ------- Listen on port 3000 and handle all requests   --------

//["TSLA", 'AMD', "FUV"]

// Listing for a get request and responding with data on the requested Ticker Symbol.
app.get("/", async (req, res) => {
  try {
    //get stockdata and userStockData form mongodb using the provided Username
    let rawStocksData = await main(req.query.username).catch(console.error);

    let returnStockObject = [];
    for (i = 0; i < rawStocksData.stockData.length; i++) {
      let stockData = rawStocksData.stockData[i];
      let userStockData = rawStocksData.userStockData.stocksData.filter(
        (stock) => {
          stock.symbol === stockData.symbol;
        }
      );
      let stockObject = {
        StockData: {
          symbol: stockData.symbol,
          marketOpen: stockData.regularMarketOpen,
          marketClose: stockData.regularMarketPreviousClose,
          sharesShort: stockData.sharesShort,
          totalCash: stockData.totalCash,
          marketCap: stockData.marketCap,
          revenue: stockData.revenue,
          dividendsPerShare: stockData.dividendsPerShare,
        },
        userStockData: {
          symbol: userStockData.symbol,
          toHighPrice: userStockData.toHighPrice,
          highPrice: userStockData.highPrice,
          lowPrice: userStockData.lowPrice,
          toLowPrice: userStockData.toLowPrice,
        },
      };
      returnStockObject.push(stockObject);
    }

    console.log(returnStockObject);
    // res.send(req.query.stocks)
    res.send(returnStockObject);
  } catch (e) {
    console.error(e);
  }
});

// Start the Express aplication and start listening on port 3000
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
