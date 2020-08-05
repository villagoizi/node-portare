require('dotenv').config({path: '.env'})

module.exports = {
    PORT: process.env.PORT || 5000,
    SECRET_SESSION: process.env.SESSION || 'supersecret1',
    SECRET_KEY: process.env.KEY || 'keymaster1'
}