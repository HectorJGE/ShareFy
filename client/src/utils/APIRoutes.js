const host = process.env.REACT_APP_API_BASE_URL;

// Para las publicaciones
const allPublicacionesRoute = `${host}/api/publicacion/all`; 
const publicacionRoute = `${host}/api/publicacion`; // Se le pasa adicionalmente unos parametros extras
const editarPublicacionRoute = `${host}/api/editar/publicacion`; // Se le pasa adicionalmente "/:id"
const nuevaPublicacionRoute = `${host}/api/publicacion/nuevo`
const borrarPublicacionRoute = `${host}/api/publicacion/borrar`; // Se le pasa adicionalmente "/:id"
const borrarComentarioRoute = `${host}/api/publicacion/borrar/comentario`; // Se le pasa adicionalmente "/:id" 
const agregarComentarioRoute = `${host}/api/publicacion/agregar/comentario`; // Se le pasa adicionalmente "/:id" 
const publicacionUserRoute = `${host}/api/publicacion/usuario`; // Se le pasa adicionalmente "/:id"

// Para conexiones del usuario
const allUsersRoute = `${host}/api/auth/allusers`;  // Se le tiene que pasar adicionalmente "/:id"
const loginRoute = `${host}/api/login`;
const logoutRoute = `${host}/api/logout`;
const registerRoute = `${host}/api/registrar`;
const getUserRoute = `${host}/api/user`; // Se le tiene que pasar adicionalmente "/:id"

// Para los mensajes
const addMessageRoute = `${host}/api/message/add`;
const getMessageRoute = `${host}/api/message/get`;

// Exportamos las rutas
export { 
    allPublicacionesRoute,
    publicacionRoute,
    editarPublicacionRoute,
    nuevaPublicacionRoute,
    borrarComentarioRoute,
    agregarComentarioRoute,
    borrarPublicacionRoute,
    publicacionUserRoute,
    allUsersRoute, 
    loginRoute,
    getUserRoute,
    logoutRoute,
    registerRoute,
    addMessageRoute, 
    getMessageRoute
};