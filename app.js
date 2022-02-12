const express = require('express')
const app = express()
const port = 3000

const stockInfo = StockInfo[
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
  },

];

app.get('/', (req, res) => {
  res.send(stockInfo)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})