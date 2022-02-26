const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

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
	
	

let Actions = ['Buy', 'Sell', 'Hold'];

app.get('/', (req, res) => {
  // console.log("No params");
  // console.log(req.query);
  let stock = stockInfo.filter(item => item.Symbol === req.query.symbol);
  res.send(stock)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})