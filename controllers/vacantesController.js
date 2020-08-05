const Vacante  = require('../models/Vacantes');


exports.crearVacante = (req,res,next) => {
    
    res.render('crearVacante',{
        titlePage: 'Nueva vacante',
        tagline: 'Llena el formulario y crea una nueva vacante',
    });
}

exports.crearVacanteAction = async (req,res,next) => {
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
    const vacante = await Vacante.findOne({ url: req.params.url}).lean();
    if(!vacante) return next()

    res.render('ver-vacante', {
        vacante,
        titlePage: vacante.titulo,
        barra:true
    })
}

exports.editarVacanteUrl = async (req,res,next) => {
    const vacante = await Vacante.findOne({url: req.params.url}).lean();
    if(!vacante) return next()

    console.log(vacante, req.user);
    res.render('editar-vacante',{
        titlePage: `Editar- ${vacante.titulo}`,
        barra:true,
        vacante
    })
}
exports.editarVacanteUrlAction = async (req,res,next) => {
    
    const vacanteUpdate = req.body;
    vacanteUpdate.skills = req.body.skills.split(',');

    const vacante = await Vacante.findOneAndUpdate({url: req.params.url}, vacanteUpdate,{
        new:true,
        runValidators: true
    })

    res.redirect(`/vacantes/${vacante.url}`);
}