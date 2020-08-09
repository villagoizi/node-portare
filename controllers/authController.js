const passport = require('passport');
const Vacantes = require('../models/Vacantes');
const {
    mongooseToObj,
    multipleMongooseToObj
} = require('../services/mongooseObject');

exports.authUsuario = passport.authenticate('local',{
    successRedirect: '/admin',
    failureRedirect:'/iniciar-sesion',
    failureFlash: true
});

//Revisar si el usuario esta autenticado
exports.verificarUsuario = (req,res,next)=> {
    if(req.isAuthenticated()){
        return next(); // esta autenticado
    }
    res.redirect('/iniciar-sesion');
}

exports.panelDeAdmin = async (req,res,next) => {
    const vacantes = multipleMongooseToObj(await Vacantes.find({autor: req.user._id}));


    res.render('administracion',{
        titlePage: 'Panel de administracion',
        tagline: 'Crea y administra tus vacantes',
        nombre: req.user.nombre,
        cerrarSesion: true,
        vacantes
    }
    )
}

exports.cerrarSesion = (req,res) => {
    req.logout();
    req.flash('correct', 'Sesion cerrada');
    res.redirect('/iniciar-sesion');
}