## Instructions for running

Unzip the folder `stocks.zip` and cd into it

Run `npm install` to install the dependencies

Run `npm run start` to start the application

You should then see a simple screen with a header and a search field prompting you to search for stock symbols.
Type in the symbol you want to search and a card should appear with the name and current stock price of the stock.

To `buy` you simply enter in the number of shares you want to purchase and press the buy button. If you have already purchased those stocks
then your current balance will be updated. Otherwise a new card will appear with the amount of shares you just bought as your current balance.

## Limitations
TextFields for entering numbers only have the basic level of validation currently. So, negative numbers are accepted and are a good way to break the program if you're so inclined. If you choose this route, there is currently a `60 second` timeout for your data to reset back to defaults on a page refresh.

Currently selling all of your shares will not cause the card associated with them to disappear. 