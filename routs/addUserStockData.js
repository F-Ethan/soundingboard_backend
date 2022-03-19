const { addUserStock } = require("../data/mongodb");

let addUserStockData = async (req, res) => {
  try {
    let rawStocksData = await addUserStock(req.query.symbol).catch(
      console.error
    );

    return rawStocksData;
  } catch (e) {
    console.error(e);
  }
};

module.exports = { addUserStockData };
