const { main } = require("../data/getUserStockData");
const { makeStockObject } = require("../components/StockObject");

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

      let mystockObject = makeStockObject(stockData);

      // stock and user data object
      let stockObject = {
        stockData: mystockObject,
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
