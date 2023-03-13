const Messages = require('./../models/message.model');

// Este método obtiene los mensajes entre dos usuarios
const getMessages = (req, res, next) => {
    // Obtenemos los usuarios de la petición (from y to)
    const { from, to } = req.body;

    // Buscamos los mensajes entre los dos usuarios y los ordenamos por fecha
    Messages.find({
        users: {
            $all: [from, to],
        },
    }).sort({ updatedAt: 1 })
        .then((messages) => {
            // Mapeamos los mensajes para que solo devolvamos el texto y si el mensaje es de nosotros o no
            const projectedMessages = messages.map((msg) => {
                return {
                    // Comprobamos si el mensaje es de nosotros o no
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                };
            });
            // Devolvemos los mensajes
            res.json(projectedMessages);
        })
        .catch((err) => {
            res.status(401).json(err);
        });
};


const getSenders = (req, res) => {
    // Obtenemos los usuarios de la petición (from y to)
    const { from, to } = req.body;

    // Busca todos los mensajes enviados a to por parte de los usuarios en from
    Messages.find({
        users: {$all: to},
        sender: {$in: from}
    }).select(["sender"]).then((senders) => {
            // Nos aseguramos de no tener repeticiones en la respuesta a la consulta
            const onlySenders = senders.map( (value) => value.sender.toString() )
            const uniqueSenders = onlySenders.filter((element, index) => {
                return onlySenders.indexOf(element) === index;
            })
            res.json(uniqueSenders)
        })
        .catch((err) => {
            res.status(401).json(err)
        });
};

// Este método crea un mensaje entre dos usuarios
const createMessage = (req, res, next) => {
    // Obtenemo los usuarios y el mensaje de la petición (from, to y message)
    const { from, to, message } = req.body;

    // Creamos el mensaje
    Messages.create({
        message: { text: message },
        users: [from, to],
        sender: from,
    })
        .then((data) => {
            // Si el mensaje se crea correctamente, devolvemos un mensaje de éxito
            if(data) {
                return res.json({ msg: "Message added successfully." });
            } else {
                return res.json({ msg: "Failed to add message to the database" });
            } 
        })
        .catch((err) => {
            res.status(401).json(err);
        });
};

module.exports = {
    getMessages,
    createMessage,
    getSenders
};