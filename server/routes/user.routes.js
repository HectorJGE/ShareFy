const express = require("express");
const router = express.Router();
const ControladorUsuarios = require("./../controllers/user.controllers");

router.post("/registrar", ControladorUsuarios.registroUsuario);
router.post("/login", ControladorUsuarios.loginUsuario);
router.get("/user/:_id", ControladorUsuarios.getUsuario);
router.get("/search/users/:query", ControladorUsuarios.searchUsuarios);
router.get('/logout', ControladorUsuarios.logOutUser);
router.get("/allUsers/:id", ControladorUsuarios.getAllUsers);
router.put("/user/editar/perfil/:_id", ControladorUsuarios.updateExistingUsuario);

module.exports = router;