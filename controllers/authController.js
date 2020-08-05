const passport = require('passport');
const Vacantes = require('../models/Vacantes');

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
    const vacantes = await Vacantes.find({autor: req.user._id}).lean();

    console.log(vacantes);

    res.render('administracion',{
        titlePage: 'Panel de administracion',
        tagline: 'Crea y administra tus vacantes',
        vacantes
    }
    )
}