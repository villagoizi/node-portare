const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');
const { body, validationResult } = require('express-validator');

exports.crearCuenta = (req,res,next) => {
    res.render('crear-cuenta', {
        titlePage: 'Crea tu cuenta',
        tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    });
}

exports.validarRegistro = [
    //Sanitizar
    body('nombre').escape(),
    //body('email').escape(),
    body('password').escape(),
    body('confirmar').escape(),
    //Validar
    body('nombre')
        .notEmpty()
        .withMessage('El nombre es obligatorio'),
    body('email')
        .notEmpty().withMessage('El correo es obligatorio')
        .isEmail().withMessage('Correo invalido'),
    body('password')
        .notEmpty()
        .withMessage('El campo contraseña no puede ir vacio')
        .custom( (value, {req} ) => {
            if(value !== req.body.confirmar){
                throw new Error('Las contraseñas no son iguales');
            }
            else {
                return value;
            }
        }),      
]


exports.crearCuentaAction = async (req,res,next) => {
    const logs = validationResult(req);

    

    if(!logs.isEmpty()){
        req.flash('error', logs.errors.map(error => error.msg));
        res.render('crear-cuenta', {
            titlePage: 'Crea tu cuenta',
            tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',
            mensajes: req.flash()
        });
        return;
    }

    /*
    const verificarUsuario = await Usuarios.findOne({email: req.body.email});

    if(verificarUsuario){
        req.flash('error', ['Correo ya registrado, inicia sesion']);
        res.render('crear-cuenta', {
            titlePage: 'Crea tu cuenta',
            tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',
            mensajes: req.flash()
        });        
    }
    */
    const usuario = new Usuarios(req.body);

    try {
        await usuario.save();
        res.redirect('/iniciar-sesion');

    } catch (error) {
        req.flash('error', error);
        res.redirect('/crear-cuenta');        
    }
    
}

exports.iniciarSesion = (req,res,next) => {
    res.render('iniciar-sesion', {
        titlePage: 'Iniciar sesion'
    });
}

exports.iniciarSesionAction = (req,res,next) => {
    console.log(req.body); 
}