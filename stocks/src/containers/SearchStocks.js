import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Input, withStyles, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { requestStockData, tryBuyShares } from "../utils/actions";
import SearchResultCard from "../components/SearchResultCard";

const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing.unit * 2,
    marginLeft: 20,
    width: "100%"
  },
  input: {
    width: 220,
    marginLeft: 5
  },
  fetching: {
    margin: 10,
    marginLeft: 20
  }
});

const mapStateToProps = state => {
  return {
    stockData: state.requestStockData.stockData,
    wallet: state.walletTransactions.wallet,
    transactionPending: state.portfolioTransactions.pending,
    dataPending: state.requestStockData.pending,
    error: state.requestStockData.error
  };
};

const mapDispatchToProps = dispatch => ({
  onRequestStockData: symbol => dispatch(requestStockData(symbol)),
  onTryBuyShares: (symbol, price, quantity) =>
    dispatch(tryBuyShares(symbol, price, quantity))
});

class SearchStocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      searching: false,
      shouldRender: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactionPending === true) {
      this.setState({ shouldRender: false });
    }

    if (this.state.searching && this.props.stockData !== nextProps.stockData) {
      this.setState({ shouldRender: true, searching: false });
    }
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleClick = onRequestStockData => {
    onRequestStockData(this.state.value);
    this.setState({ searching: true });
  };

  closeCard = () => {
    this.setState({ shouldRender: false });
  };

  render() {
    let {
      classes,
      onRequestStockData,
      onTryBuyShares,
      stockData,
      wallet,
      dataPending
    } = this.props;
    return (
      <Fragment>
        <div className={classes.search}>
          <div>
            <Input
              placeholder="Search stocks..."
              onChange={this.handleChange}
              disableUnderline
              className={classes.input}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
            <Button
              className={classes.searchButton}
              onClick={() => this.handleClick(onRequestStockData)}
            >
              Search
            </Button>
          </div>
        </div>
        <div className={classes.fetching}>
          {dataPending && "Fetching data..."}
          {this.state.shouldRender && (
            <SearchResultCard
              stockData={stockData}
              tryBuyShares={onTryBuyShares}
              closeCard={this.closeCard}
              wallet={wallet}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

SearchStocks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SearchStocks));
