const Chat = require('./../models/chat.model');

// Este método obtiene los mensajes entre dos usuarios
const getNonFollowedChat = (req, res) => {
    // Obtenemos los usuarios de la petición (from y to)
    const { from, to } = req.body;

    // Buscamos los mensajes entre los dos usuarios y los ordenamos por fecha
    Messages.find({
        users: [{$nin: from}, to],
    }).then((messages) => {
            res.json(messages)
        })
        .catch((err) => {
            res.status(401).json(err);
        });
};

// Este método crea un mensaje entre dos usuarios
const createChat = async (req, res ) => {
    // Obtenemo los usuarios y el mensaje de la petición (from, to y message)
    const { from, to } = req.body;

    const chat = await Chat.find({ users: {$all: [from, to]} })

    console.log(chat);

    if(chat.length!==0){
        res.json({error: "Hubo un error"})
    }else{
        // Creamos el mensaje
        Chat.create({
            users: [from, to]
        })
            .then((data) => {
                // Si el mensaje se crea correctamente, devolvemos un mensaje de éxito
                if(data) {
                    return res.json({ msg: "Chat added successfully." });
                } else {
                    return res.json({ msg: "Failed to add chat to the database" });
                } 
            })
            .catch((err) => {
                res.status(401).json(err);
            });
    }

};

module.exports = {
    createChat,
    getNonFollowedChat
};