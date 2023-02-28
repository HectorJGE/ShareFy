const ControladorPublicaciones = require("../controllers/publicacion.controllers");
const {authenticate} = require('../config/jwt.config')

module.exports = app => {
    app.post("/api/nuevaPublicacion", ControladorPublicaciones.nuevaPublicacion);
    app.get("/api/todasLasPublicaciones", ControladorPublicaciones.todasLasPublicaciones);
    app.get("/api/ppu/:idUsuario", ControladorPublicaciones.publicacionesPorUsuario);
    app.get("/api/publicacion/:_id", ControladorPublicaciones.PublicacionPorId);
    app.put("/api/updatePublicacionComentario/:_id", ControladorPublicaciones.actualizarPublicacionComentario);
    app.put("/api/deleteComentario/:_id", ControladorPublicaciones.borrarComentario);
    app.put("/api/updateLike/:_id", ControladorPublicaciones.actualizarPublicacionLike);
    app.put("/api/deleteLike/:_id", ControladorPublicaciones.deletelike);
    app.delete("/api/borrar/:_id", ControladorPublicaciones.borrarPublicacion);
};