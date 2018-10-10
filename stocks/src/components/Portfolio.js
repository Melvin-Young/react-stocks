import React, { Fragment } from "react";
import PortfolioCard from "./PortfolioCard";

const Portfolio = ({ portfolio, trySellShares }) => {
  return (
    <Fragment>
      {Object.keys(portfolio).map(stock_symbol => {
        let quantity = portfolio[stock_symbol].quantity;
        return (
          <PortfolioCard
            key={stock_symbol}
            stock_symbol={stock_symbol}
            quantity={quantity}
            trySellShares={trySellShares}
          />
        );
      })}
    </Fragment>
  );
};

export default Portfolio;
