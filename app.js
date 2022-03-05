const express = require('express')
// const data = require('./data')
// const fs = require('fs');
// const path = require('path');
var cors = require('cors');
const { Console } = require('console');

const {MongoClient} = require('mongodb');

const app = express()
const port = 3000

app.use(cors())






//  -------  Connect to MongoDB database  --------



// make a call to the MongoDB database and return all the information on the given stock 
async function findListingByName(client, stocks) {
  const cursor = await client.db('MyPursuit').collection('stockData').find({symbol: { $in : stocks }}) ;
  const results = await cursor.toArray();
  // if (results) {
  //     console.log(`Found a listing in the collection with the symbol '${stocks}':`);
  //     results.forEach(result => console.log(result))
  //     // results.forEach(result => console.log(result.symbol))
  //   } else {
  //     console.log(`No listings found with the symbol '${stocks}'`);
  //     console.log(results);
  // }
  return results
}


// Connect to the Mongo Client and retrieve the data
async function main(symbol){
  
  const uri = "mongodb+srv://fethanerrier:Stronger88@cluster0.664pc.mongodb.net/MYPURSUIT?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      let result = await findListingByName(client, symbol);
      return result; 

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
  
}






//  ------- Listen on port 3000 and handle all requests   --------

//["TSLA", 'AMD', "FUV"]


// Listing for a get request and responding with data on the requested Ticker Symbol. 
app.get('/', async (req, res) => {
  // console.log("No params");
  // console.log(data);
  // let stock = stockInfo.filter(item => item.Symbol === req.query.symbol);
  // res.send(stock)
  // console.log(req.query.stocks)

  let rawStocksData = await main(req.query.stocks).catch(console.error);
  let returnStockInfo = [];
  let stocks = rawStocksData.forEach(stock => {
    let stockObject =  {
      symbol: stock.symbol,
      marketOpen: stock.regularMarketOpen,
      marketClose: stock.regularMarketPreviousClose,
      sharesShort: stock.sharesShort,
      totalCash: stock.totalCash,
      marketCap: stock.marketCap,
      revenue: stock.revenue,
      dividendsPerShare: stock.dividendsPerShare,
    }
    returnStockInfo.push(stockObject);
  })
  console.log(returnStockInfo)
  // res.send(req.query.stocks)
  res.send(returnStockInfo)
})


// Start the Express aplication and start listening on port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})