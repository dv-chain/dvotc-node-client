var v5 = require('./v5');
var v4 = require('./v4');
var limits = require('./limits');
var auth = require('./auth');

//Get Quote using the V5 API.

(async ()=> {
    console.log("======V5 GET QUOTE=======")
    let v5Quote = await v5.getQuote({
        side: "Buy",
        quantity: 0.100005,
        asset: "BTC",
        counterAsset: "USD"
    });
    console.log(v5Quote);


    console.log("======EXECUTE QUOTE=======")
    let executionStatus = await v5.executeQuote({
        key: v5Quote.tradeKey
    });
    console.log(executionStatus);
    
    console.log("======GET LIMITS and BALANCES=======")
    let balances = await limits.getBalances();
    console.log(balances);
    
    console.log("======GET TRADES=======")
    let trades = await v4.getTrades({ status : 'Complete', limit: 1}); 
    //Other allowed values before, after see docs for more info https://docs.trade.dvchain.co/#Get-All-Trades-and-Orders
    console.log(trades);


    console.log("======v4 GET QUOTE=======")
    let v4Quote = await v4.getQuote({
        side: "Buy",
        quantity: 0.100005,
        asset: "ETH",
        counterAsset: "BTC"
    });
    console.log(v4Quote);


    console.log("======v4 GET QUOTE=======")
    let prices = await v4.getAllUSDPrices();
    console.log(JSON.stringify(prices, null ,2));


    console.log("======v4 GET PRICE =======")
    let price = await v4.getPrice({
        asset: "ETH",
        counterAsset: "BTC"
    });
    console.log(JSON.stringify(price, null ,2));


    console.log("=====v4 Place limit order =======")

    let order = await v4.placeLimitOrder({
        side : "Buy",
        quantity : "0.1",
        asset: "ETH",
        counterAsset: "BTC",
        limitPrice: "0.00001"
    })
    console.log(order);

    let orderId = order._id;

    console.log("=====v4 Cancel Open Order =======")

    let result = await v4.cancelOrder(orderId)
    console.log(result);

    console.log("===== Blacklist Token =======")

    let generatedToken = await auth.getToken()
    let blackListed = await auth.blackListToken(generatedToken)
    console.log(blackListed);

})()


require('http').createServer((req, res)=> { }).listen(42424);