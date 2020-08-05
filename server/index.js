const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const { SECRET_SESSION,SECRET_KEY} = require('../config/env');
const { DB_HOST } = require('../config/db');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const passport = require('../config/passport');

module.exports = (app) => {
    
    //Settings
    app.set('views', path.join(__dirname, '../views'));

    //Middlewares
    app.use(express.static( path.join(__dirname, '../public') ));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(session({
        secret: SECRET_SESSION,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            url: DB_HOST
        })
      }))
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use((req,res,next)=> {
        res.locals.mensajes = req.flash();
        next();
    })
    //Engine
    app.engine('.hbs', exphbs(
        {
            defaultLayout: 'main',
            helpers: require('../helpers/handlebars'),
            layoutsDir: path.join(app.get('views'),'layouts'),
            extname: '.hbs'
        }
    ));
    app.set('view engine', '.hbs');

    return app;
}