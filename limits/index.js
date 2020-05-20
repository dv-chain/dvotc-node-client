var { getAuth } = require('../auth');
var { APP_URL } = require('../secrets.js')
var fetch = require('node-fetch');

module.exports = {
    getBalances : async function() {
        var requestOptions = {
            method: 'GET',
            headers: {
              "Authorization": await getAuth()
            },
          };
          let url = `${APP_URL}/api/v4/balances`;
          var data;
          var response = await fetch(url, requestOptions)
          if(response.status == 200) {
              data = await response.json();
              return data;
          } else {
              throw new Error(`Request Failed with status : ${response.status}`);
          }
    }
}