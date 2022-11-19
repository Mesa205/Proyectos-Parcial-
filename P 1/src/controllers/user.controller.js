import { response } from "../helpers/Response.js";
import { userModel } from "../models/user.models.js";


const userCtrl={}

userCtrl.listar= async(req,res)=>{
    try {
        const user = await userModel.find()
        response(res, 200, true, user, "lista de usuarios")

    } catch (error) {

        response(res, 500, false, "", error.message)


        // res.status(500).json({
        //     ok: false,
        //     data:"",
        //     message: error.message
        // })
    }
},

userCtrl.actualizar = async (req, res) => {
    try {
      const { id } = req.params;
      const { correo } = req.body;
      // await empleadoModel.findByIdAndUpdate({_id:id}, req.body);
      const user = await userModel.findById(id);
      if (!user) {
        return response(res, 404, false, "", "registro no encontrado");
      }
  
      if (user.correo !== correo) {
        const userCorreo = await userModel.findOne({ correo });
        if (userCorreo) {
          return response(
            res,
            400,
            false,
            "",
            `el correo ${correo} ya existe en otro registro`
          );
        }
      }
      await user.updateOne(req.body);
      response(res, 200, true, "", "registro actualizado");
    } catch (error) {
      response(res, 500, false, "", error.message);
    }
  };
  
export default userCtrl;
  