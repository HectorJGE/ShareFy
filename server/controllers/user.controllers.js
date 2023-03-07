const Usuario = require("./../models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const key = process.env.SECRET_KEY

module.exports = {
    registroUsuario: async (req, res) => {
        user = await Usuario.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ errors: { email: { message: "Este email ya está registrado" } } })
        } else {
            try {
                const nuevoUsuario = await Usuario.create(req.body)
                const userToken = jwt.sign({ _id: nuevoUsuario._id }, key)
                res.status(201).cookie('userToken', userToken, { httpOnly: true, expires: new Date(Date.now() + 90000) })
                    .json({ successMessage: 'Usuario registrado ', user: nuevoUsuario })
            } catch (error) {
                res.status(401).json(error)
            }
        }
    },

    loginUsuario: async (req, res) => {
        Usuario.findOne({ email: req.body.email }).then
            ((usuario) => {
                if (!usuario) {
                    return res.status(400).json(...{ error: "Email o password no válido" })
                }
                bcrypt.compare(req.body.password, usuario.password, (error, data) => {
                    if (data) {
                        const userToken = jwt.sign({ _id: usuario._id }, key)
                        res.status(201).cookie('userToken', userToken, { httpOnly: true, expires: new Date(Date.now() + 9000000) })
                            .json({ successMessage: 'Usuario logueado ', user: usuario })
                    } else {
                        return res.status(400).json({ error: "Email o password no válido" })
                    }
                })
            }).catch((e) => {
                res.status(400).json({ error: "Email o password no válido", e })
            })
    },

    getUsuario: async (req, res) => {
        const usuario = await Usuario.findOne({ _id: req.params._id })
            .then(user => res.json({ user }))
            .catch(err => res.json({ message: "Error, algo salió mal", error: err }));
    },
    
    logOutUser: (req, res) => {
        res.clearCookie('userToken')
        res.json({ success: 'Usuario salio' })
    }

}