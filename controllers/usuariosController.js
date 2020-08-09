const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');
const { body, validationResult } = require('express-validator');
const {mongooseToObj} = require('../services/mongooseObject');
const multer = require('multer');
const { upload } = require('../middlewares/multer');


exports.subirImagen = (req,res,next) => {

    upload(req,res,function(err){
        if( err instanceof multer.MulterError) {
            return next()
        }

        next();
    });   

}

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

exports.validarEditar = [
    body('nombre').escape(),
    body('email').escape(),
    body('password').escape(),
    body('nombre')
        .notEmpty()
        .withMessage('El campo nombre no puede ir vacio'),
    body('email')
        .notEmpty()
        .withMessage('El campo email no puede ir vacio')
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

exports.editarPerfil = async (req,res) => {
    const user = mongooseToObj( await Usuarios.findById(req.user._id));
    res.render('editar-perfil',{
        titlePage: 'Edita tu perfil en devJobs',
        nombre: req.user.nombre,
        cerrarSesion: true,
        user
    })
}
exports.editarPerfilAction = async (req,res) => {
    /*
    const logs = validationResult(req);

    if(!logs.isEmpty()){
        req.flash('error', logs.errors.map( err => err.msg));
        res.render('editar-perfil',{
            titlePage: 'Edita tu perfil en devJobs',
            nombre: req.user.nombre,
            cerrarSesion: true,
            user: mongooseToObj(req.user),
            mensajes: req.flash()
        })
        return;
    }
    */

    try {
        const user = await Usuarios.findById(req.user._id);
        user.nombre = req.body.nombre;
        user.email = req.body.email;
        if(req.body.password){
            user.password = req.body.password;
        }

        if(req.file){
            user.imagen = req.file.path;
        }

        await user.save();
        req.flash('correcto', 'Cambios guardados');
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }


}

