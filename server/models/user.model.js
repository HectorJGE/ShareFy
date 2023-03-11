const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Nombre es requerido"],
        minlength: [2, "Nombre debe tener 2 o más caractéres"]       
    },
    apellido: {
        type: String,
        required: [true, "Apellido es requerido"],
        minlength: [2, "Apellido debe tener 2 o más caractéres"]
    },
    email: {
        type: String,
        required: [true, "Email es requerido"],
        unique: true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password es requerido"],
        minlength: [8, "Password debe tener 8 o más caractéres"]
    },
    profilePicture: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
    }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        next()
    } catch {
        console.log('Error al guardar usuario', error)
    }
});

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('cpass', 'Las contraseñas no coinciden');
    }
    if (this.confirmPassword == '') {
        this.invalidate('cpass', 'Confirm Password es requerido');
    }
    next();
});

UserSchema.virtual('confirmPassword')
    .get(() => this.confirmPassword)
    .set(value => this.confirmPassword = value);

module.exports = mongoose.model('usuario', UserSchema)

