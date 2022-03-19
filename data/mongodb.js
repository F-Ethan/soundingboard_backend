//  -------  imports  --------
const express = require("express");
const dotenv = require("dotenv").config();
const { Console } = require("console");

const { MongoClient } = require("mongodb");

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

// make a call to the MongoDB database and return the information on the given stock
async function findOneStockData(client, stock) {
  const results = await client
    .db("MyPursuit")
    .collection("stockData")
    .findOne({ symbol: stock });
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

  // if (results) {
  //   console.log(
  //     `Found a listing in the collection with the symbol '${username}':`
  //   );
  //   console.log(results);
  // } else {
  //   console.log(`No listings found with the username '${username}'`);
  //   console.log(results);
  // }
  return results;
}

// Connect to the Mongo Client and retrieve the data
async function main(username) {
  //get URI form envrioment variable file (.env)
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // get userStockData using the provided username
    let userStockData = await findUserStockData(client, username);
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

// Connect to the Mongo Client and retrieve the data
async function addUserStock(symbol) {
  //get URI form envrioment variable file (.env)
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    //get the stockData on the stocks in the symbols array
    let stockData = await findOneStockData(client, symbol);

    return stockData;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

module.exports = { main, addUserStock };
