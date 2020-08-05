const {model,Schema} = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email:{
        type:String,
        unique:true,
        trim: true,
        lowercase:true
    },
    nombre:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    tokenPass: String,
    expPass: Date
});

userSchema.pre('save', async function(next){
    // si el password ya esta hasheado
    if(!this.isModified('password')) return next();
    // si no esta hasheado
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
})

userSchema.post('save', function(err,doc,next){
    if(err.name == 'MongoError' && err.code == 11000){
        next('Ese correo ya esta registrado');
    }
    else {
        next(err);
    }
})

//Autenticar Usuarios
userSchema.methods = {
    compararPassword: function(password){
        return bcrypt.compareSync(password,this.password);
    }
}

module.exports = model('Usuarios', userSchema);