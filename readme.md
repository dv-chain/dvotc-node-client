# DV OTC NODE CLIENT

This is a sample nodejs client for dv otc implementing the docs at https://docs.trade.dvchain.co/.

## Environment

Use the .env file to change the environment. Below are the urls to production and sandbox.

[Production](https://trade.dvchain.co)
[Sandbox](https://sandbox.trade.dvchain.co)

## Running the example

Update your email address/password in the .env file. You can also provide it as an environment variable USER_NAME and PASSWORD respectively instead and run example.js. By default it runs on the sandbox environment.

## Difference between v5 and v4 API.

V5 API RFQ provides a consistent 5 sec expiry time while v4 API provides an expiry ranging from 0 to 5 secs.

## Placing a limit order.

To place a limit order get prices from the v4 api and use the v4 limit order to place the order.

For sample responses, see results.txt
