const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const Usuarios = mongoose.model('Usuarios');

passport.serializeUser((usuario,done) =>done(null,usuario._id) );

passport.deserializeUser(async (id,done) =>{
  const usuario = await Usuarios.findById(id).exec();
  return done(null,usuario);
} )


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (email, password, done) => {

        const usuario = await Usuarios.findOne({email: email});

        if(!usuario) return done(null,false,{
            message: 'El email no esta registrado'
        })

        const verificarPassword = await usuario.compararPassword(password);
        if(!verificarPassword) return done(null,false,{
            message: 'La contraseña es incorrecta'
        });

        return done(null, usuario);
    }
  ));



module.exports = passport;