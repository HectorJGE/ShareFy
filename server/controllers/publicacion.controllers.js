const Publicacion = require("../models/Publicacion.model");

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

module.exports.publicacionesPorUsuario = (req, res) => {
  Publicacion.finfindOned({usuario:req.params.usuario})
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
    .then(publicacion => console.log({  }))
    .catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};