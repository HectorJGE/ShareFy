const ControladorUsuarios = require("../controllers/user.controllers");

module.exports = app => {
    app.post( "/api/registrar" ,ControladorUsuarios.registroUsuario );
    app.post( "/api/login" , ControladorUsuarios.loginUsuario );
    app.get( "/api/user/:_id" , ControladorUsuarios.getUsuario );
    app.get('/api/logout', ControladorUsuarios.logOutUser);
};