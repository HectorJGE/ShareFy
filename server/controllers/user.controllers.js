const Usuario = require("./../models/user.model")
const Publicacion = require("./../models/publicacion.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const key = process.env.SECRET_KEY

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            // Buscamos todos los usuarios que no sean el usuario que está haciendo la petición 
            const users = await Usuario.find({ _id: { $ne: req.params.id } }).select([
                "nombre",
                "apellido",
                "email",
                "profilePicture",
                "_id"
            ]);
            // Devolvemos los usuarios con cada campo especificado en el select
            return res.json(users);
        } catch(error) {
            res.status(401).json(error)
        }
    },


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

    searchUsuarios: async (req, res) => {
        const usuario = await Usuario.find({ nombre: {$regex : "^" + req.params.query} })
            .then(users => res.json(users))
            .catch(err => res.json({ message: "Error, algo salió mal", error: err }));
    },

    logOutUser: (req, res) => {
        res.clearCookie('userToken')
        res.json({ success: 'Usuario salio' })
    },

    updateExistingUsuario: async (req, res) => {
        const usuario = await Usuario.findOneAndUpdate({ _id: req.params._id} , req.body, { runValidators: true , new: true })
            .then(updatedUsuario =>{ 
                res.json({ updatedUsuario })
            })
            .catch(err => res.json({ message: "Error, algo salió mal", error: err }));
    },

    addFollow: async (req, res) => {
        try{
            let mensaje = {}
            await Usuario.findOneAndUpdate({ _id: req.body.idFrom }, { $addToSet: {followed: req.body.idTo}} , { runValidators: true , new: true } )
                .then(follower => {
                    const { _id, nombre, apellido } = follower
                    mensaje = {follower: { _id, nombre, apellido }}
                })
            await Usuario.findOneAndUpdate({ _id: req.body.idTo }, { $addToSet: {followers: req.body.idFrom}} , { runValidators: true , new: true } )
                .then(followed => {
                    const { _id, nombre, apellido } = followed
                    mensaje = {...mensaje, followed: { _id, nombre, apellido }}
                })
            res.json(mensaje)
        }catch(err){
            res.json({ message: "Error, algo salió mal", error: err })
        }
    },

    getFollowers: async (req, res) => {
        const followers = await Usuario.findOne({ _id: req.params._id }).select(["followers"])
        const followersData = await Usuario.find({ _id: { $in: followers.followers }}).select([
            "nombre",
            "apellido",
            "email",
            "profilePicture",
            "_id"
        ])
        res.json(followersData)
    },

    getFollowed: async (req, res) => {
        const followed = await Usuario.findOne({ _id: req.params._id }).select(["followed"])
        const followedData = await Usuario.find({ _id: { $in: followed.followed }}).select([
            "nombre",
            "apellido",
            "email",
            "profilePicture",
            "_id"
        ])
        res.json(followedData)
    },

    unfollow: async (req,res) => {
        try{
            let mensaje = {}
            await Usuario.findOneAndUpdate({ _id: req.body.idFrom }, { $pull: {followed: req.body.idTo}} , { runValidators: true , new: true } )
                .then(follower => {
                    const { _id, nombre, apellido } = follower
                    mensaje = {follower: { _id, nombre, apellido }}
                })
            await Usuario.findOneAndUpdate({ _id: req.body.idTo }, { $pull: {followers: req.body.idFrom}} , { runValidators: true , new: true } )
                .then(followed => {
                    const { _id, nombre, apellido } = followed
                    mensaje = {...mensaje, followed: { _id, nombre, apellido }}
                })
            res.json(mensaje)
        }catch(err){
            res.json({ message: "Error, algo salió mal", error: err })
        }
    },

    isFollowing: async (req,res) => {
        const userFollows = await Usuario.findOne({ _id: req.body.idFrom }).select(["followed"])
        res.json({ follows: userFollows.followed.includes(req.body.idTo) })
    }

}