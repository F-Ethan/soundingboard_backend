const { main } = require("../data/mongodb");

let userStockData = async (req, res) => {
  try {
    //get stockdata and userStockData form mongodb using the provided Username
    let rawStocksData = await main(req.query.username).catch(console.error);

    // combine all the stockdata with userStockData into an array of objects
    let returnStockObject = [];
    for (i = 0; i < rawStocksData.stockData.length; i++) {
      let stockData = rawStocksData.stockData[i];
      let userStockData = rawStocksData.userStockData.stocksData.filter(
        (stock) => {
          return stock.symbol === stockData.symbol;
        }
      );

      // stock and user data object
      let stockObject = {
        stockData: {
          symbol: stockData.symbol,
          marketOpen: stockData.regularMarketOpen,
          marketClose: stockData.regularMarketPreviousClose,
          sharesShort: stockData.sharesShort,
          totalCash: stockData.totalCash,
          marketCap: stockData.marketCap,
          revenue: stockData.revenue,
          dividendsPerShare: stockData.dividendsPerShare,
        },
        userStockData: userStockData[0],
      };

      // push the stockObject into the array being sent to the front end
      returnStockObject.push(stockObject);
    }

    //Send stockobject to the aplications front end
    return returnStockObject;
  } catch (e) {
    console.error(e);
  }
};

module.exports = { userStockData };
