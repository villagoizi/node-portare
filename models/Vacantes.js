const { model, Schema} = require('mongoose');
const slug = require('slug');
const uid = require('shortid');

const vacanteSchema = new Schema({
    titulo: {
        type: String,
        required: 'El nombre de la vacante es obligatorio',
        trim: true
    },
    empresa: {
        type: String,
        trim: true
    },
    ubicacion: {
        type: String,
        trim: true,
        required: 'La ubicacion es obligatoria'
    },
    salario: {
        type: String,
        default: 0,
        trim: true
    },
    contrato: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        lowercase: true
    },
    skills: [String],
    candidatos: [{
        nombre: String,
        email: String,
        curriculum: String
    }]
})

vacanteSchema.pre('save', function(next){
    const generateId = uid.generate();
    this.url = `${slug(this.titulo)}-${generateId}`;
    next();
})

module.exports = model('Vacante', vacanteSchema);