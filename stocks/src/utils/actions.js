import {
  CHANGE_SEARCH_FIELD,
  REQUEST_STOCKS_PENDING,
  REQUEST_STOCKS_ERROR,
  REQUEST_STOCKS_SUCCESS,
  TRY_SELL_SHARES,
  BOUGHT_SHARES,
  SOLD_SHARES,
  CREDIT_WALLET,
  DEBIT_WALLET
} from "../constants";

export const setSearchField = text => ({
  type: CHANGE_SEARCH_FIELD,
  payload: text
});

export const requestStockData = searchQuery => dispatch => {
  // Assuming this is a personal tool so my apikey will be safe
  let formattedQuery = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${searchQuery}&apikey=some api`;
  dispatch({ type: REQUEST_STOCKS_PENDING });
  fetch(formattedQuery)
    .then(response => response.json())
    .then(stockData => {
      // Assuming this data will be available and formatted correctly
      let formattedStockData = {
        stock_symbol: stockData["Global Quote"]["01. symbol"],
        open: stockData["Global Quote"]["02. open"],
        high: stockData["Global Quote"]["03. high"],
        low: stockData["Global Quote"]["04. low"],
        price: stockData["Global Quote"]["05. price"],
        volume: stockData["Global Quote"]["06. volume"],
        date: stockData["Global Quote"]["07. latest trading day"],
        previous_close: stockData["Global Quote"]["08. previous close"],
        change: stockData["Global Quote"]["09. change"],
        change_percent: stockData["Global Quote"]["10. change percent"]
      };
      dispatch({ type: REQUEST_STOCKS_SUCCESS, payload: formattedStockData });
      return formattedStockData;
    })
    .catch(error => dispatch({ type: REQUEST_STOCKS_ERROR, payload: error }));
};

// A real system would need these to be async transactions that can rollback changes on errors.
// These will also need to be thunks in the future
export const creditWallet = amount => ({
  type: CREDIT_WALLET,
  payload: amount
});

export const debitWallet = amount => ({
  type: DEBIT_WALLET,
  payload: amount
});

// These are thunks because they will need to be async operations in the future
export const tryBuyShares = (stock_symbol, price, quantity) => dispatch => {
  const totalCost = price * quantity;
  dispatch({
    type: BOUGHT_SHARES,
    payload: { stock_symbol, quantity, totalCost }
  });
  dispatch(debitWallet(totalCost));
};

export const trySellShares = (stock_symbol, quantity) => dispatch => {
  // Assuming this is a personal tool so my apikey will be safe
  let formattedQuery = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock_symbol}&apikey=T4HAYY48HRDY301Z`;
  dispatch({ type: TRY_SELL_SHARES, payload: { stock_symbol, quantity } });
  fetch(formattedQuery)
    .then(response => response.json())
    .then(stockData => {
      // Assuming this data will be available and formatted correctly
      let formattedStockData = {
        stock_symbol: stockData["Global Quote"]["01. symbol"],
        open: stockData["Global Quote"]["02. open"],
        high: stockData["Global Quote"]["03. high"],
        low: stockData["Global Quote"]["04. low"],
        price: stockData["Global Quote"]["05. price"],
        volume: stockData["Global Quote"]["06. volume"],
        date: stockData["Global Quote"]["07. latest trading day"],
        previous_close: stockData["Global Quote"]["08. previous close"],
        change: stockData["Global Quote"]["09. change"],
        change_percent: stockData["Global Quote"]["10. change percent"]
      };
      dispatch({ type: REQUEST_STOCKS_SUCCESS, payload: formattedStockData });
      return formattedStockData;
    })
    .then(formattedStockData => {
      let totalCost = formattedStockData.price * quantity;
      dispatch({ type: SOLD_SHARES, payload: { stock_symbol, quantity } });
      dispatch(creditWallet(totalCost));
    })
    .catch(error => dispatch({ type: REQUEST_STOCKS_ERROR, payload: error }));
};
