import mongoose from "mongoose";

const{Schema, model}= mongoose;


const userSchema= new Schema({
    nombres:{
        type: String,
        required:[true, " el campo es requerido"],
    },
    apellidos: {
        type: String,
        default: "",
    },
    correo:{
        type: String, 
        unique: true,
        required: [true, "el campo es requerido"]
    },
    contraseña:{
        type: String,
        require:[true,"El campo Password es obligatorio "]
    },
},{
    timestamps: true
})

export const userModel=model("user", userSchema);