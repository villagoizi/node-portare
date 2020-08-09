const init_db = require('./config/connect-db');
init_db();

const express = require('express');
const session = require('express-session');
const app = express();

const config = require('./server');
const routes = require('./routes');
const { PORT } = require('./config/env');

//Setting app
config(app);
//Routes
app.use(routes);


app.listen(PORT, ()=>{ console.log("Server on port 5000")});