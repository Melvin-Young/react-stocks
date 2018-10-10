// Dependencies
import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {trySellShares, creditWallet, debitWallet } from '../utils/actions';

// Components
import StockSearchForm from './SearchStocks';
import Header from '../components/Header';
import Portfolio from '../components/Portfolio';

// Styling
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import './Main.css';

// Takes state (store) that was created in index.js and gets it ready to be sent to components
const mapStateToProps = (state) => {
  return {
    stockData: state.requestStockData.stockData,
    portfolio: state.portfolioTransactions.portfolio,
    wallet: state.walletTransactions.wallet,
    pending: state.requestStockData.pending,
    error: state.requestStockData.error
  }
};

// Bundles "events" used in redux to update store
const mapDispatchToProps = (dispatch) => ({
  onTrySellShares: (symbol, quantity) => dispatch(trySellShares(symbol, quantity)),
  onTryCreditWallet: (amount) => dispatch(creditWallet(amount)),
  onTryDebitWallet: (amount) => dispatch(debitWallet(amount))
});

class Main extends Component {
  render() {
    const {onTrySellShares, onTryCreditWallet, portfolio, wallet} = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <Header wallet={wallet} creditWallet={onTryCreditWallet}/>
        <StockSearchForm/>
        <Portfolio portfolio={portfolio} trySellShares={onTrySellShares}/>
      </Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
