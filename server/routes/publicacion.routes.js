const express = require("express");
const router = express.Router();
const ControladorPublicaciones = require("./../controllers/publicacion.controllers");
const { authenticate } = require('./../config/jwt.config')

//Publicacion
router.post("/publicacion/nuevo", authenticate, ControladorPublicaciones.nuevaPublicacion);
router.get("/publicacion/all", authenticate, ControladorPublicaciones.todasLasPublicaciones);
router.get("/publicacion/usuario/:idUsuario", authenticate, ControladorPublicaciones.publicacionesPorUsuario);
router.get("/publicacion/:_id", authenticate, ControladorPublicaciones.PublicacionPorId);
router.put("/editar/publicacion/:_id", authenticate, ControladorPublicaciones.editarPublicacion);
router.delete("/publicacion/borrar/:_id", authenticate, ControladorPublicaciones.borrarPublicacion);
//Comentarios
router.put("/publicacion/agregar/comentario/:_id", authenticate, ControladorPublicaciones.actualizarPublicacionComentario);
router.put("/publicacion/borrar/comentario/:_id", authenticate, ControladorPublicaciones.borrarComentario);
//Likes
router.put("/publicacion/like/:_id", authenticate, ControladorPublicaciones.actualizarPublicacionLike);
router.put("/publicacion/unlike/:_id", authenticate, ControladorPublicaciones.deletelike);

module.exports = router;