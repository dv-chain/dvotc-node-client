require('dotenv').config()

const USER_NAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;
const APP_URL = process.env.APP_URL;

console.log("Using user name " , USER_NAME)
console.log("Using environment url as ", APP_URL)

if(USER_NAME === "") {
    console.log("No user name found. Please update the user name and password in .env file at the root directory");
}

if(USER_NAME === "YOUR_USER_NAME") {
    console.log("Default user name found. Please update the user name and password in .env file");
    process.exit()
}


module.exports = {
    USER_NAME,
    PASSWORD,
    APP_URL
}