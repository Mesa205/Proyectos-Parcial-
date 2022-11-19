import { Router } from 'express';
import { Validfields } from '../middleware/Validfield.js';
import {check} from "express-validator"
import userCtrl from '../controllers/user.controller.js';
import { seedDt } from '../seed/seedDb.js';



const route = Router();

route.get("/seed",seedDt)
route.get("/", userCtrl.listar);



route.post( "/",
    [
        check("nombres", "el campo nombres es obligatorio")
        .notEmpty(),
  
        check("apellidos").optional().isLength({ min: 4, max: 50 }),
  
        check("correo").isEmail(),

        check("contraseña", "el campo nombres es obligatorio")
        .notEmpty()
    ],
    Validfields, 
    userCtrl.guardar


);

export default route;