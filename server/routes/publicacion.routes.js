const ControladorPublicaciones = require("../controllers/publicacion.controllers");
const {authenticate} = require('../config/jwt.config')

module.exports = app => {
    //Publicacion
    app.post("/api/publicacion/nuevo",authenticate, ControladorPublicaciones.nuevaPublicacion);
    app.get("/api/publicacion/all",authenticate, ControladorPublicaciones.todasLasPublicaciones);
    app.get("/api/publiacion/usuario/:idUsuario",authenticate, ControladorPublicaciones.publicacionesPorUsuario);
    app.get("/api/publicacion/:_id",authenticate, ControladorPublicaciones.PublicacionPorId);
    app.put("/api/editar/publicacion/:_id",authenticate, ControladorPublicaciones.editarPublicacion);
    app.delete("/api/publicacion/borrar/:_id",authenticate, ControladorPublicaciones.borrarPublicacion);
    //Comentarios
    app.put("/api/publicacion/agregar/comentario/:_id",authenticate, ControladorPublicaciones.actualizarPublicacionComentario);
    app.put("/api/publicacion/borrar/comentario/:_id",authenticate, ControladorPublicaciones.borrarComentario);
    //Likes
    app.put("/api/publicacion/like/:_id",authenticate, ControladorPublicaciones.actualizarPublicacionLike);
    app.put("/api/publicacion/unlike/:_id",authenticate, ControladorPublicaciones.deletelike);
};