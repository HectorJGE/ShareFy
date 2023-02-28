const Publicacion = require("../models/Publicacion.model");
const Usuario = require("../models/user.model")

module.exports.nuevaPublicacion = (req, res) => {
  Publicacion.create(req.body)
    .then(nuevaPublicacionCreada => res.json({ Publicacion: nuevaPublicacionCreada}))
    .catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};

module.exports.todasLasPublicaciones = (req, res) => {
  Publicacion.find()
    .then(publicaciones => res.json({publicaciones}))
    .catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};

module.exports.publicacionesPorUsuario =async (req, res) => {
  const usuario = await Usuario.findOne({_id:req.params.idUsuario})
  if(!usuario){
    res.status(400).json({error:"Error, algo salió mal"})
  }
  Publicacion.find({usuario:{id:usuario.id,nombre:usuario.nombre}})
    .then(publicaciones => res.json({publicaciones}))
    .catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};

module.exports.PublicacionPorId = (req, res) => {
  Publicacion.findOne({_id:req.params._id})
    .then(publicacion => res.json(publicacion))
    .catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};

module.exports.actualizarPublicacionLike = (req, res) => {
  Publicacion.findOneAndUpdate({_id:req.params._id}, {$push:{likes:req.body}}, {new:true})
    .then(publicacion => console.log({publicacion}))
    .catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};

module.exports.actualizarPublicacionUnlike = (req, res) => {
  Publicacion.findOneAndUpdate({_id:req.params._id}, {$pull:{likes:req.body}}, {new:true})
    .then(publicacion => console.log({publicacion}))
    .catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};

module.exports.borrarPublicacion = (req, res) => {
  Publicacion.deleteOne({_id:req.params._id})
    .then(publicacion => console.log('Publicacion eliminada'))
    .catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};