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

// console.log a list of all curent databases open on MongoDB
// async function listDatabases(client){
//   databasesList = await client.db().admin().listDatabases();

//   console.log(databasesList);
//   databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };


// make a call to the MongoDB database and return all the information on the given stock 
async function findListingByName(client, nameOfListing) {
  const cursor = await client.db('MyPursuit').collection('stockData').find({symbol: nameOfListing}) ;
  const results = await cursor.toArray();
  // if (results) {
  //     console.log(`Found a listing in the collection with the symbol '${nameOfListing}':`);
  //     results.forEach(result => console.log(result.symbol))
  // } else {
  //     console.log(`No listings found with the symbol '${nameOfListing}'`);
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

//Call the main function to retriev the data 
let symbol = main("TSLA").catch(console.error);
console.log(`I found ${symbol} in the database`)

//Tempory data to load info on some ticker symbols
const stockInfo = [
  {
    Symbol: 'TSLA',
    
    Marketcap: "336.477B",
    Action: "Hold",
    Color: "success",
  },
  {
    Symbol: 'ARKK',
    
    Marketcap: "987M",
    Action: "BUY",
    Color: "warning",


  },
  {
    Symbol: 'LMND',
    Marketcap: "2.54B",
    Action: "HOLD",
    Color: "success",


  },
  {
    Symbol: 'FUV',
    Marketcap: "345.77M",
    Action: "HOLD",
    Color: "success",

  },
  {
    Symbol: 'FL',
    Marketcap: "2.918B",
    Action: "BUY",
    Color: "warning",

  },
  {
    Symbol: 'ETH-USD',
    Marketcap: "336.477B",
    Action: "BUY",
    Color: "warning",

  },
  {
    Symbol: 'DJI',
    Marketcap: "N/A",
    Action: "BUY",
    Color: "warning",

  },
  {
    Symbol: 'GSPC',
    Marketcap: "N/A",
    Action: "SELL",
    Color: "danger",

  },
  {
    Symbol: 'CARG',
    Marketcap: "5.465B",
    Action: "SELL",
    Color: "danger",

  },
  {
    Symbol: 'IXIC',
    Marketcap: "N/A",
    Action: "BUY",
    Color: "warning",
  },
  {
    Symbol: 'RH',
    Marketcap: "8.508B",
    Action: "BUY",
    Color: "warning",
  },
  {
    Symbol: 'CLF',
    Marketcap: "11.302B",
    Action: "SELL",
    Color: "danger",
  },
  {
    Symbol: 'ISPO',
    Marketcap: "2.577B",
    Action: "HOLD",
    Color: "success",
  },
  {
    Symbol: 'ABBV',
    Marketcap: "264.499B",
    Action: "SELL",
    Color: "danger",
  },
  {
    Symbol: 'XRP-USD',
    Marketcap: "37.207B",
    Action: "BUY",
    Color: "warning",
  },
  {
    Symbol: 'SE',
    Marketcap: "76.667B",
    Action: "SELL",
    Color: "danger",
  },
  {
    Symbol: 'CM.TO',
    Marketcap: "73.782B",
    Action: "BUY",
    Color: "warning",
  },
  {
    Symbol: 'REGI',
    Marketcap: "2.202B",
    Action: "HOLD",
    Color: "success",
  },
  {
    Symbol: 'X',
    Marketcap: "7.022B",
    Action: "BUY",
    Color: "warning",
  },
  {
    Symbol: 'ALF',
    Marketcap: "33.319M",
    Action: "HOLD",
    Color: "success",
  },
  {
    Symbol: 'JNJ',
    Marketcap: "436.459B",
    Action: "HOLD",
    Color: "success",
  },
  {
    Symbol: 'ZOM',
    Marketcap: "342.179M",
    Action: "HOLD",
    Color: "success",
  },
  {
    Symbol: 'BTE.TO',
    Marketcap: "3.222B",
    Action: "SELL",
    Color: "danger",
  },
  {
    Symbol: 'MULN',
    Marketcap: "24.04M",
    Action: "HOLD",
    Color: "success",
  },
  {
    Symbol: 'FCX',
    Marketcap: "67.415B",
    Action: "SELL",
    Color: "danger",
  },
  {
    Symbol: 'NUE',
    Marketcap: "35.374B",
    Action: "BUY",
    Color: "warning",
  },
  {
    Symbol: 'CYDY',
    Marketcap: "352.019M",
    Action: "HOLD",
    Color: "success",
  },
  {
    Symbol: 'XRP-CAD',
    Marketcap: "47.304B",
    Action: "BUY",
    Color: "warning",
  },
  {
    Symbol: 'NKE',
    Marketcap: "219.484B",
    Action: "BUY",
    Color: "warning",
  },
  {
    Symbol: 'TAL',
    Marketcap: "1.877B",
    Action: "HOLD",
    Color: "success",
  },
  {
    Symbol: 'LMT',
    Marketcap: "111.515B",
    Action: "BUY",
    Color: "warning",
  },
  {
    Symbol: '31.113B',
    Marketcap: "1.877B",
    Action: "HOLD",
    Color: "success",
  },
  {
    Symbol: 'WTRH',
    Marketcap: "82.449M",
    Action: "HOLD",
    Color: "success",
  },
  

];	
	

// let rawData = fs.readFileSync('data.json');
// console.log(rawData);
	

// let Actions = ['Buy', 'Sell', 'Hold'];


// Listing for a get request and responding with data on the requested Ticker Symbol. 
app.get('/', (req, res) => {
  // console.log("No params");
  // console.log(data);
  let stock = stockInfo.filter(item => item.Symbol === req.query.symbol);
  res.send(stock)
})


// Start the Express aplication and start listening on port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})