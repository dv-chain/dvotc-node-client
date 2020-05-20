var { getAuth } = require('../auth');
var { APP_URL } = require('../secrets.js')
var queryString = require('querystring');
var fetch = require('node-fetch');

module.exports = {
    getQuote : async function({ side, quantity, asset, counterAsset }) {
        var requestOptions = {
          method: 'GET',
          headers: {
            "Authorization": await getAuth()
          },
        };
        let query = queryString.stringify({ side, qty:quantity, asset, counterAsset });
        let url = `${APP_URL}/api/v5/RFQ?${query}`;
        console.log(url);
        var data;
        var response = await fetch(url, requestOptions)
        if(response.status == 200) {
            data = await response.json();
            return data;
        } else {
            throw new Error(`Request Failed with status : ${response.status} ${await response.text()}`);
        }
    },

    executeQuote: async function(reference) {
        var requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": await getAuth()
            },
            body: JSON.stringify(reference),
        };
        let url = `${APP_URL}/api/v5/RFQ/execute`;
        let response = await fetch(url, requestOptions)
        if(response.status == 200) {
            let data = await response.json();
            return data;
        } else {
            throw new Error(`Request Failed with status : ${response.status} ${await response.text()}`);
        }
    }
}