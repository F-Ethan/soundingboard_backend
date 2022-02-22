const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

const stockInfo = [
  {
    Symbol: 'TSLA',
    Upper: 1500,
    Lower: 1000,
  },
  {
    Symbol: 'ARKK',
    Upper: 900,
    Lower: 700,
  },
  {
    Symbol: 'LMND',
    Upper: 90,
    Lower: 50,
  },
  {
    Symbol: 'FUV',
    Upper: 10,
    Lower: 5,
  }

];

app.get('/', (req, res) => {
  // console.log("No params");
  // console.log(req.query);
  let stock = stockInfo.filter(item => item.Symbol === req.query.symbol);
  // console.log(stock)
  res.send(stock)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})