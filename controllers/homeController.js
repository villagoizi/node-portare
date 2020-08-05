const Vacante  = require('../models/Vacantes');

exports.Home = async (req,res,next) =>{
    const vacantes = await Vacante.find().lean();
    if(!vacantes) return next()
    res.render('home',{
        titlePage: 'Portare',
        tagline: 'Encuentra y publica trabajos para developers web',
        barra: true,
        button: true,
        vacantes
    })
}