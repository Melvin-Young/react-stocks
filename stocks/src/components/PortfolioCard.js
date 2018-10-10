import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

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
    padding: 20
  }
};

class PortfolioCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityForSale: this.props.quantity,
      shouldRender: true
    };
  }

  // Used to update state before rerender
  // In looking at the docs after finishing project it is being deprecated ¯\_(ツ)_/¯
  componentWillReceiveProps(nextProps) {
    if (nextProps.quantity !== this.props.quantity) {
      this.setState({ quantityForSale: nextProps.quantity });
    }

    if(nextProps.quantity < 1) {
      this.setState({ shouldRender: false });  
    }
  }

  handleChange = max => event => {
    if (event.target.value <= max) {
      this.setState({
        quantityForSale: event.target.value
      });
    }
  };

  render() {
    const { classes, trySellShares, stock_symbol, quantity } = this.props;
    return (
      this.state.shouldRender && <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            variant="headline"
            component="h2"
          >
            {stock_symbol.toUpperCase()}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Shares: {quantity}
          </Typography>
        </CardContent>
        <CardActions>
          <TextField
            id="number"
            label="Selling"
            value={this.state.quantityForSale}
            onChange={this.handleChange(quantity)}
            type="number"
            className={classes.textField}
            InputLabelProps={{ shrink: true }}
            InputProps={{ inputProps: { min: 0, max: quantity } }}
            margin="normal"
          />
          <Button
            className="sellButton"
            size="small"
            onClick={() =>
              trySellShares(stock_symbol, this.state.quantityForSale)
            }
          >
            Sell Shares
          </Button>
        </CardActions>
      </Card>
    );
  }
}

PortfolioCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PortfolioCard);
