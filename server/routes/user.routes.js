const express = require("express");
const router = express.Router();
const ControladorUsuarios = require("./../controllers/user.controllers");

router.post("/registrar", ControladorUsuarios.registroUsuario);
router.post("/login", ControladorUsuarios.loginUsuario);
router.get("/user/:_id", ControladorUsuarios.getUsuario);
router.get('/logout', ControladorUsuarios.logOutUser);

module.exports = router;