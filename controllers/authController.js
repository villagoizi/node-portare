const passport = require('passport');

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

exports.panelDeAdmin = (req,res,next) => {
    res.render('administracion',{
        titlePage: 'Panel de administracion',
        tagline: 'Crea y administra tus vacantes',

    }
    )
}