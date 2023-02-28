const mongoose = require("mongoose");

const PublicacionSchema = new mongoose.Schema({
	titulo: {
        type: String
    },
    cancion: {
        type: String,
        required: [true, "Cancion es requerida"]
    },
    cuerpo: {
        type: String
    },
    usuario:{
        id:{
            type: String
        },
        nombre:{
            type: String
        }
    },
    likes: [],
    comentarios:[]
});

const Publicacion = mongoose.model("Publicacion", PublicacionSchema);

module.exports = Publicacion;