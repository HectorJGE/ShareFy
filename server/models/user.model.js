const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    
    nombre: {
        type: String,
        required: [true, "Nombre es requerido"]
    },
    apellido: {
        type: String,
        required: [true, "Apellido es requerido"]
    },
    email: {
        type: String,
        required: [true, "Email es requerido"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password es requerido"],
        minlength: [8, "Password debe tener 8 o más caractéres"]
    }
}, {timestamps: true});

UserSchema.pre('save', async function(next) {
    try{
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        next()
    }catch{
        console.log('Error al guardar usuario', error)
    }
});

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('cpass', 'Password must match confirm password');
    }
    next();
});

UserSchema.virtual('confirmPassword')
    .get( () => this.confirmPassword )
    .set( value => this.confirmPassword = value );

module.exports = mongoose.model('usuario', UserSchema)

