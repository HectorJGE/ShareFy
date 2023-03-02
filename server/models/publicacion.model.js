const mongoose = require("mongoose");

const PublicacionSchema = new mongoose.Schema({
    cancion: {
        titulo:{
            type: String
        },
        imgUrl:{
            type: String
        },
        artist:{
            type: String
        }
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