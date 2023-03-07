const Publicacion = require("./../models/publicacion.model");
const Usuario = require("./../models/user.model")

const nuevaPublicacion = (req, res) => {
	Publicacion.create(req.body)
		.then(nuevaPublicacionCreada => res.json({ Publicacion: nuevaPublicacionCreada }))
		.catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};

const todasLasPublicaciones = (req, res) => {
	Publicacion.find()
		.then(publicaciones => res.json({ publicaciones }))
		.catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};

const publicacionesPorUsuario = async (req, res) => {
	const usuario = await Usuario.findOne({ _id: req.params.idUsuario })
	if (!usuario) {
		res.status(400).json({ error: "Error, algo salió mal" })
	}
	Publicacion.find({ usuario: { id: usuario.id, nombre: usuario.nombre } })
		.then(publicaciones => res.json({ publicaciones }))
		.catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};

const PublicacionPorId = (req, res) => {
	Publicacion.findOne({ _id: req.params._id })
		.then(publicacion => res.json(publicacion))
		.catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};

const actualizarPublicacionComentario = (req, res) => {
	Publicacion.findOneAndUpdate({ _id: req.params._id }, { $push: { comentarios: req.body } }, { new: true })
		.then(publicacion => console.log({ publicacion }))
		.catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};

const editarPublicacion = (req, res) => {
	Publicacion.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true })
		.then(publicacion => console.log({ publicacion }))
		.catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};

const borrarComentario = (req, res) => {
	Publicacion.findOneAndUpdate({ _id: req.params._id }, { $pull: { comentarios: req.body } }, { new: true })
		.then(publicacion => console.log({ publicacion }))
		.catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};

const actualizarPublicacionLike = (req, res) => {
	Publicacion.findOneAndUpdate({ _id: req.params._id }, { $push: { likes: req.body } }, { new: true })
		.then(publicacion => console.log({ publicacion }))
		.catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};

const deletelike = (req, res) => {
	Publicacion.findOneAndUpdate({ _id: req.params._id }, { $pull: { likes: req.body } }, { new: true })
		.then(publicacion => console.log({ publicacion }))
		.catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};

const borrarPublicacion = (req, res) => {
	Publicacion.deleteOne({ _id: req.params._id })
		.then(publicacion => console.log('Publicacion eliminada'))
		.catch(err => res.json({ message: "Error, algo salió mal", error: err }));
};

module.exports = {
	nuevaPublicacion,
	todasLasPublicaciones,
	publicacionesPorUsuario,
	PublicacionPorId,
	actualizarPublicacionComentario,
	editarPublicacion,
	borrarComentario,
	actualizarPublicacionLike,
	deletelike,
	borrarPublicacion
};
