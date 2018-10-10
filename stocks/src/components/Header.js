import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  AppBar,
  Toolbar,
  Input,
  Button,
  Typography
} from "@material-ui/core";

const styles = {
  root: {
    flexGrow: 1
  },
  menu: {
    backgroundColor: "black",
    marginBottom: 20
  },
  balance: {
    flexGrow: 1,
    color: "green",
    fontSize: 20
  },
  greeting: {
    flexGrow: 1,
    fontSize: 20
  },
  addFunds: {
    flexGrow: 1,
    fontSize: 15,
    "&:after": {
      borderBottomColor: "white"
    }
  },
  addFundsButton: {
    flexGrow: 1,
    fontSize: 15,
    color: "white"
  },
  text: {
    color: "white"
  }
};

class Header extends Component {
  state = {
    funds: 0
  };

  handleChange = () => event => {
    this.setState({ funds: event.target.value });
  };

  render() {
    const { classes, wallet, creditWallet } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.menu} position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.greeting}
            >
              Hello Melvin
            </Typography>
            <Typography variant="title" className={classes.balance}>
              Balance: {wallet}
            </Typography>
            <Typography>
              <Input
                id="number"
                label="Add Funds"
                defaultValue={this.state.funds}
                onChange={this.handleChange()}
                type="number"
                className={classes.addFunds}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: 0 , className: classes.text }}
                margin="normal"
              />
              <Button
                className={classes.addFundsButton}
                onClick={() => creditWallet(this.state.funds)}
              >
                Add Funds
              </Button>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
