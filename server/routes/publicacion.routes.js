const ControladorPublicaciones = require("../controllers/publicacion.controllers");
const {authenticate} = require('../config/jwt.config')

module.exports = app => {
    app.post("/api/nuevaPublicacion", ControladorPublicaciones.nuevaPublicacion);
    app.get("/api/todasLasPublicaciones", ControladorPublicaciones.todasLasPublicaciones);
    app.get("/api/ppu/:idUsuario", authenticate, ControladorPublicaciones.publicacionesPorUsuario);
    app.get("/api/Publicacion/:_id", ControladorPublicaciones.PublicacionPorId);
    app.put("/api/updateLike/:_id", ControladorPublicaciones.actualizarPublicacionLike);
    app.put("/api/updateUnLike/:_id", ControladorPublicaciones.actualizarPublicacionUnlike);
    app.delete("/api/borrar/:_id", authenticate, ControladorPublicaciones.borrarPublicacion);
};