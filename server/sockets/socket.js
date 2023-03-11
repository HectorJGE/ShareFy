module.exports = (io) => {
    let users = [];

    // Controladores del socket
    const addUser = (userId, socketId) => {
        // Comprobar si el usuario ya existe en el array
        const user = users.find((user) => user.userId === userId);
        // Si el usuario no existe, lo añadimos al array
        if (!user) {
            users.push({ userId, socketId });
        }
    };

    // Eliminar usuario del array
    const removeUser = (socketId) => {
        users = users.filter((user) => user.socketId !== socketId);
    };

    // Obtener usuario
    const getUser = (userId) => {
        return users.find((user) => user.userId === userId);
    };

    // Evento para cuando un cliente se conecta, recibe el socket del cliente conectado
    io.on('connection', (socket) => {
        console.log(`Cliente conectado: ${socket.id}`);

        // Añadir usuario, recibe el id del usuario
        socket.on("addUser", (userId) => {
            addUser(userId, socket.id);
            // Emitir a todos los clientes el array de usuarios
            io.emit("getUsers", users);
        });

        // Enviar mensaje, recibe el id del usuario que envia el mensaje, el id del usuario que recibe el mensaje y el texto del mensaje
        socket.on("sendMessage", (data) => {
            // Obtener el user que recibe el mensaje
            const user = getUser(data.to);
            if (user) {
                // Enviar el mensaje al usuario que recibe el mensaje
                io.to(user.socketId).emit("getMessage", data.msg);
            } else {
                console.log("No se ha encontrado el usuario");
            }
        });

        // Cuando un cliente se desconecta
        socket.on("disconnect", () => {
            console.log(`Cliente desconectado: ${socket.id}`);
            // Remover usuario del array
            removeUser(socket.id);
            io.emit("getUsers", users);
        });
    });
};