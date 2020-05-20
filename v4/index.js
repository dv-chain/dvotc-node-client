var { getAuth } = require('../auth');
var { APP_URL } = require('../secrets.js')
var fetch = require('node-fetch');
var queryString = require('querystring');

// before	none	If set, will only return trades before this date/time.
// after	none	If set, will only return trades after this date/time.
// page	none	If set, it will return the given page number of trades.
// limit	none	If set, it will limit the number of trades returned per page.
// status	none	If set, it will return only the trades corresponding to the status. Allowed values are Open, Cancelled, Complete


module.exports = {
    getTrades : async function({ before, after, page, limit, status}) {
        let query = queryString.stringify({ before, after, page, limit, status });
        var requestOptions = {
            method: 'GET',
            headers: {
              "Authorization": await getAuth()
            },
          };
          let url = `${APP_URL}/api/v4/trades?${query}`;
          var data;
          var response = await fetch(url, requestOptions)
          if(response.status == 200) {
              data = await response.json();
              return data;
          } else {
              throw new Error(`Request Failed with status : ${response.status}`);
          }
    },

    getQuote : async function({ side, quantity, asset, counterAsset }) {
        var requestOptions = {
          method: 'GET',
          headers: {
            "Authorization": await getAuth()
          },
        };
        let query = queryString.stringify({ side, qty:quantity, asset, counterAsset });
        let url = `${APP_URL}/api/v4/RFQ?${query}`;
        var data;
        var response = await fetch(url, requestOptions)
        if(response.status == 200) {
            data = await response.json();
            return data;
        } else {
            throw new Error(`Request Failed with status : ${response.status} ${await response.text()}`);
        }
    },
    
    getPrice : async function({ asset, counterAsset }) {
        var requestOptions = {
          method: 'GET',
          headers: {
            "Authorization": await getAuth()
          },
        };
        let url = `${APP_URL}/api/v4/prices/${asset}/${counterAsset}`;
        var data;
        var response = await fetch(url, requestOptions)
        if(response.status == 200) {
            data = await response.json();
            return data;
        } else {
            throw new Error(`Request Failed with status : ${response.status} ${await response.text()}`);
        }
    },

    getAllUSDPrices : async function() {
        var requestOptions = {
          method: 'GET',
          headers: {
            "Authorization": await getAuth()
          },
        };
        let url = `${APP_URL}/api/v4/prices`;
        var data;
        var response = await fetch(url, requestOptions)
        if(response.status == 200) {
            data = await response.json();
            return data;
        } else {
            throw new Error(`Request Failed with status : ${response.status} ${await response.text()}`);
        }
    },

    placeLimitOrder: async function({ side, quantity, asset, counterAsset, limitPrice}) {
        let body = {
            side,
            orderType : "Limit",
            qty: quantity,
            asset,
            counterAsset,
            limitPrice
        }
        var requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": await getAuth()
            },
            body: JSON.stringify(body),
        };
        let url = `${APP_URL}/api/v4/trade`;
        let response = await fetch(url, requestOptions)
        if(response.status == 200) {
            let data = await response.json();
            return data;
        } else {
            throw new Error(`Request Failed with status : ${response.status} ${await response.text()}`);
        }
    },

    cancelOrder: async function(id) {
        var requestOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": await getAuth()
            }
        };
        let url = `${APP_URL}/api/v4/trades/${id}`;
        let response = await fetch(url, requestOptions)
        if(response.status == 200) {
            let data = await response.json();
            return data;
        } else {
            throw new Error(`Request Failed with status : ${response.status} ${await response.text()}`);
        }
    }
}