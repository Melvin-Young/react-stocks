import {
  CHANGE_SEARCH_FIELD,
  REQUEST_STOCKS_PENDING,
  REQUEST_STOCKS_SUCCESS,
  REQUEST_STOCKS_ERROR,
  TRY_BUY_SHARES,
  BOUGHT_SHARES,
  SOLD_SHARES,
  CREDIT_WALLET,
  DEBIT_WALLET,
  TRY_SELL_SHARES
} from "../constants";

const initialStateSearch = {
  searchField: ""
};
export const searchStockData = (state = initialStateSearch, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      return { ...state, searchField: action.payload };
    default:
      return state;
  }
};

const initialStateStockData = {
  stockData: {},
  pending: false,
  error: ""
};

export const requestStockData = (
  state = initialStateStockData,
  action = {}
) => {
  switch (action.type) {
    case REQUEST_STOCKS_PENDING:
      return { ...state, pending: true };
    case REQUEST_STOCKS_SUCCESS:
      return { ...state, pending: false, stockData: action.payload };
    case REQUEST_STOCKS_ERROR:
      return { ...state, pending: false, error: action.payload };
    default:
      return state;
  }
};

const initialStatePortfolio = {
  portfolio: {},
  pending: false,
  error: ""
};

export const portfolioTransactions = (
  state = initialStatePortfolio,
  action = {}
) => {
  // Other actions such as buying crypto currencies would be here

  let updatedPortfolio = {};
  switch (action.type) {
    case TRY_BUY_SHARES:
      return { ...state, pending: true };
    case BOUGHT_SHARES:
      updatedPortfolio = updateStateForPurchase(
        state.portfolio,
        action.payload
      );
      return { ...state, portfolio: updatedPortfolio, pending: false };
    case TRY_SELL_SHARES:
      return { ...state, pending: true };
    case SOLD_SHARES:
      updatedPortfolio = updateStateForSale(state.portfolio, action.payload);
      return { ...state, portfolio: updatedPortfolio, pending: false };
    default:
      return state;
  }
};

const initialStateWallet = {
  wallet: 0,
  pending: false,
  error: ""
};

export const walletTransactions = (state = initialStateWallet, action = {}) => {
  switch (action.type) {
    case CREDIT_WALLET:
      return {
        ...state,
        wallet: Number(state.wallet) + Number(action.payload)
      };
    case DEBIT_WALLET:
      return { ...state, wallet: state.wallet - action.payload };
    default:
      return state;
  }
};

// Helper functions
// Drill down into state object to find property matching the name of the stock in the transaction
function updateStateForPurchase(portfolio, shares) {
  let stockName = shares.stock_symbol;
  let targetObj = portfolio[stockName];
  if (targetObj) {
    var updatedStockData = {
      ...targetObj,
      quantity: Number(targetObj.quantity) + Number(shares.quantity)
    };
    // Not updating in place because reducers shouldn't directly update state
    return { ...portfolio, [stockName]: updatedStockData };
  } else {
    return { ...portfolio, [stockName]: shares };
  }
}

function updateStateForSale(portfolio, shares) {
  debugger;
  let stockName = shares.stock_symbol;
  let targetObj = portfolio[stockName];
  if (targetObj) {
    var updatedStockData = {
      ...targetObj,
      quantity: targetObj.quantity - shares.quantity
    };
    // Not updating in place because reducers shouldn't directly update state
    return { ...portfolio, [stockName]: updatedStockData };
  } else {
    return { ...portfolio, [stockName]: shares };
  }
}
