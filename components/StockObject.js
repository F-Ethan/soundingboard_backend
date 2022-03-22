function makeStockObject(newStockData) {
  stockData = {
    symbol: newStockData.symbol,
    marketOpen: newStockData.regularMarketOpen,
    marketClose: newStockData.regularMarketPreviousClose,
    sharesShort: newStockData.sharesShort,
    totalCash: newStockData.totalCash,
    marketCap: newStockData.marketCap,
    revenue: newStockData.revenue,
    dividendsPerShare: newStockData.dividendsPerShare,
    fiftyTwoWeekHigh: newStockData.fiftyTwoWeekHigh,
    fiftyTwoWeekLow: newStockData.fiftyTwoWeekLow,
    twoHundredDayAverage: newStockData.twoHundredDayAverage,
  };

  return stockData;
}

module.exports = { makeStockObject };
