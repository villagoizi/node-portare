const Vacante  = require('../models/Vacantes');
const { multipleMongooseToObj } = require('../services/mongooseObject');

exports.Home = async (req,res,next) =>{
    const vacantes = multipleMongooseToObj( await Vacante.find() );
    if(!vacantes) return next()
    res.render('home',{
        titlePage: 'Portare',
        tagline: 'Encuentra y publica trabajos para developers web',
        barra: true,
        button: true,
        vacantes
    })
}