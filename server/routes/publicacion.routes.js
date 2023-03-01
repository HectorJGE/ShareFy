const ControladorPublicaciones = require("../controllers/publicacion.controllers");
const {authenticate} = require('../config/jwt.config')

module.exports = app => {
    app.post("/api/nuevaPublicacion",authenticate, ControladorPublicaciones.nuevaPublicacion);
    app.get("/api/todasLasPublicaciones",authenticate, ControladorPublicaciones.todasLasPublicaciones);
    app.get("/api/ppu/:idUsuario",authenticate, ControladorPublicaciones.publicacionesPorUsuario);
    app.get("/api/publicacion/:_id",authenticate, ControladorPublicaciones.PublicacionPorId);
    app.put("/api/updatePublicacionComentario/:_id",authenticate, ControladorPublicaciones.actualizarPublicacionComentario);
    app.put("/api/deleteComentario/:_id",authenticate, ControladorPublicaciones.borrarComentario);
    app.put("/api/updateLike/:_id",authenticate, ControladorPublicaciones.actualizarPublicacionLike);
    app.put("/api/deleteLike/:_id",authenticate, ControladorPublicaciones.deletelike);
    app.delete("/api/borrar/:_id",authenticate, ControladorPublicaciones.borrarPublicacion);
};