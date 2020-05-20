var { APP_URL, USER_NAME, PASSWORD } = require('./secrets.js')
var fetch = require('node-fetch');

var token = null;

var getToken = async function() {
    let auth = Buffer.from(`${USER_NAME}:${PASSWORD}`).toString("base64")
    var requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Basic ${auth}`
        },
    };
    let response = await fetch(`${APP_URL}/api/v4/auth`, requestOptions);
    if(response.status == 200) {
        let data = await response.json();
        return data.token;
    } else {
        throw new Error(`Request Failed with status : ${response.status}` + response.text);
    }
};

module.exports = {
    getToken,

    getAuth: async function() {
        if(token == null) {
            //May get called multiple times thats ok.
            token = `Bearer ${await getToken()}`;
        } 
        return token;
    },

    blackListToken: async function(token) {
        var requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ token }),
        };
        let url = `${APP_URL}/api/v4/token/deactivate`;
        let response = await fetch(url, requestOptions)
        if(response.status == 200) {
            let data = await response.json();
            return data;
        } else {
            throw new Error(`Request Failed with status : ${response.status} ${await response.text()}`);
        }
    }
}