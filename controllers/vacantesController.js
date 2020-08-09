const Vacante  = require('../models/Vacantes');
const {
    mongooseToObj ,
    multipleMongooseToObj
} = require('../services/mongooseObject');
const { body, validationResult } = require('express-validator');



exports.validarVacantes = [
    body('titulo').escape(),
    body('empresa').escape(),
    body('ubicacion').escape(),
    body('salario').escape(),
    body('contrato').escape(),
    body('skills').escape(),
    //Validar
    body('titulo')
        .notEmpty()
        .withMessage('El titulo es obligatorio'),
    body('ubicacion')
        .notEmpty().withMessage('El campo ubicacion es requerido'),
    body('empresa')
        .notEmpty()
        .withMessage('Agrega una empresa'),
    body('contrato')
        .notEmpty()
        .withMessage('Agrega un tipo de contrato'),
    body('skills')
        .notEmpty()
        .withMessage('Agrega al menos una habilidad'),
]

exports.crearVacante = (req,res,next) => {
    
    res.render('crearVacante',{
        titlePage: 'Nueva vacante',
        nombre: req.user.nombre,
        cerrarSesion: true,
        tagline: 'Llena el formulario y crea una nueva vacante',
    });
}

exports.crearVacanteAction = async (req,res,next) => {
    const logs = validationResult(req);

    if(!logs.isEmpty()){
        req.flash('error', logs.errors.map(error => error.msg));
        res.render('crearVacante', {
            titlePage: 'Nueva vacante',
            nombre: req.user.nombre,
            cerrarSesion: true,
            tagline: 'Llena el formulario y crea una nueva vacante',
            mensajes: req.flash()
        });
        return;
    }


    const vacante = new Vacante(req.body);
    vacante.skills = req.body.skills.split(',');

    //Author vacant
    vacante.autor = req.user._id;
    
    try {
        const newVacant = await vacante.save();
        res.redirect(`/vacantes/${newVacant.url}`);
    } catch (error) {
        console.log(error);
    }
    
}

exports.verVacanteUrl = async(req,res,next) => {
    const vacante = mongooseToObj( await Vacante.findOne({ url: req.params.url}) );
    if(!vacante) return next()

    res.render('ver-vacante', {
        vacante,
        titlePage: vacante.titulo,

        barra:true
    })
}

exports.editarVacanteUrl = async (req,res,next) => {

    try {
        const vacante = mongooseToObj( await Vacante.findOne({url: req.params.url}) );
        if(!vacante) return next()

        res.render('editar-vacante',{
            titlePage: `Editar- ${vacante.titulo}`,
            nombre: req.user.nombre,
            cerrarSesion: true,
            vacante
        })
        
    } catch (err) {
        console.error(err);
    }
}
exports.editarVacanteUrlAction = async (req,res,next) => {
    const vacante = mongooseToObj( await Vacante.findOne({url: req.params.url}) );
    const logs = validationResult(req);

    if(!logs.isEmpty()){
        req.flash('error', logs.errors.map(error => error.msg));
        res.render('editar-vacante',{
            titlePage: `Editar- ${vacante.titulo}`,
            nombre: req.user.nombre,
            cerrarSesion: true,
            vacante,
            mensajes: req.flash()
        })
        return;
    }
    
    const vacanteUpdate = req.body;
    vacanteUpdate.skills = req.body.skills.split(',');

    const upVacante = await Vacante.findOneAndUpdate({url: req.params.url}, vacanteUpdate,{
        new:true,
        runValidators: true
    })

    res.redirect(`/vacantes/${upVacante.url}`);
}

exports.eliminarVacante = async (req,res) => {
    const {id} = req.params;

    const vacante = await Vacante.findById(id);

    if(verificarAutor(vacante.autor, req.user._id)){
        await vacante.remove();
        console.log('eliminado');
        res.status(200).send('Vacante eliminada con exito!');
    }
    else {
        res.status(403).send('No permitido');
    }

   
}

const verificarAutor = (autor='', usuario='') => {
    if(!autor.equals(usuario)){
        return false;
    }
    return true;
}