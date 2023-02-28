const Usuario = require("../models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const key = process.env.SECRET_KEY

module.exports = {
    registroUsuario : async( req,res ) => {
        try{
            const nuevoUsuario = await Usuario.create(req.body)
            const userToken = jwt.sign({_id:nuevoUsuario._id}, key)
            res.status(201).cookie('userToken',userToken, {httpOnly:true, expires:new Date(Date.now() + 90000)})
            .json({successMessage:'Usuario registrado ', user:nuevoUsuario})
        }catch(error){
            res.status(401).json({"Ocurrio un error":error})
        }
    },

    loginUsuario : async( req,res ) => {
        const usuario = await Usuario.findOne({email:req.body.email})
        if (!usuario){
            res.status(400).json({error:"Email o password no válido"})
        }
        try{
            const passwordValida = await bcrypt.compare(req.body.password,usuario.password)
            if(!passwordValida){
                res.status(400).json({error:"Email o password no válido"})
            }else{
                const userToken = jwt.sign({_id:usuario._id}, key)
                res.status(201).cookie('userToken',userToken, {httpOnly:true, expires:new Date(Date.now() + 90000)})
                .json({successMessage:'Usuario registrado ', user:usuario})
            }
        }catch{
            res.status(400).json({error:"Email o password no válido"})
        }
    },

    getUsuario : async( req,res ) => {
        const usuario = await Usuario.findOne({_id:req.params._id})
        .then(user => res.json({user}))
        .catch(err => res.json({ message: "Error, algo salió mal", error: err }));
    },
    logOutUser:(req,res)=>{
        res.clearCookie('userToken')
        res.json({success:'Usuario salio'})
    }
    
}