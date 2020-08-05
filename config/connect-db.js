const mongoose = require('mongoose');
const {DB_HOST,CONFIG_MONGODB} = require('./db');

module.exports = () => {
    mongoose.connect(DB_HOST,CONFIG_MONGODB)
        .then( () => console.log('Db is connected'))
        .catch( err => console.error(err));

    require('../models/Vacantes');
    require('../models/Usuarios');
}