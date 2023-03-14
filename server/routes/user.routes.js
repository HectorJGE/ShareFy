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
router.put("/user/addFollow", ControladorUsuarios.addFollow);
router.put("/user/unfollow", ControladorUsuarios.unfollow);
router.get("/user/getFollowed/:_id", ControladorUsuarios.getFollowed);
router.get("/user/getFollowers/:_id", ControladorUsuarios.getFollowers);

module.exports = router;