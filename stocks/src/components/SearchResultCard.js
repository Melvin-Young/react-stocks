import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
  withStyles
} from "@material-ui/core";

const styles = {
  card: {
    minWidth: 275
  },
  title: {
    marginBottom: 16
  },
  pos: {
    marginBottom: -10,
    padding: 0
  },
  textField: {
    marginLeft: 12,
    marginRight: 20,
    width: 200
  },
  sellButton: {
    paddings: 20
  }
};

class SimpleCard extends Component {
  constructor(props) {
    super(props);
    let purchaseLimit =
      props.wallet > 0 ? props.wallet / props.stockData.price : 0;
    this.state = {
      quantityForPurchase: 0,
      purchaseLimit: purchaseLimit
    };
  }

  // Used to update state before rerender
  // In looking at the docs after finishing project it is being deprecated ¯\_(ツ)_/¯
  componentWillReceiveProps(nextProps) {
    if (nextProps.wallet !== this.props.wallet) {
      this.setState({
        purchaseLimit: nextProps.wallet / nextProps.stockData.price
      });
    }
  }

  handleChange = () => event => {
    if (this.state.purchaseLimit >= event.target.value) {
      this.setState({
        quantityForPurchase: Math.abs(event.target.value)
      });
    }
  };

  handleClick = (closeCard, tryBuyShares, stockData) => {
    tryBuyShares(
      stockData.stock_symbol.toLowerCase(),
      stockData.price,
      this.state.quantityForPurchase
    );
    closeCard();
  };

  render() {
    const { classes, tryBuyShares, closeCard, stockData } = this.props;
    const { stock_symbol, price } = stockData;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            variant="headline"
            component="h2"
          >
            {stock_symbol.toUpperCase()}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Price: {price}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography>
            <TextField
              id="number"
              label="Buying"
              value={this.state.quantityForPurchase}
              onChange={this.handleChange()}
              type="number"
              className={classes.textField}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                inputProps: { min: 0, max: this.state.purchaseLimit }
              }}
              margin="normal"
            />
          </Typography>
          <Button
            className="sellButton"
            size="small"
            onClick={() => this.handleClick(closeCard, tryBuyShares, stockData)}
          >
            Buy Shares
          </Button>
        </CardActions>
      </Card>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
