import { eliminarImagenCloudinary, subirImagenACloudinary } from "../helpers/cloudinary.actions.js";
import { deleteImg } from "../helpers/deleteimg.js";
import { response } from "../helpers/Response.js"
import { postModel } from "../models/category.model.js"

const postCtrol = {}

categoryCtrol.listar = async(req,res)=>{
    try {
        const categorys=await categoryModel.find()
        response(res,200,true,categorys,"Lista de categorys")
    } catch (error) {
        response(res,500,false,"",error.message)
    }
} ;

categoryCtrol.listarById = async (req,res) => {
    try {

        const {id} = req.params;

        const category = await categoryModel.findById(id)

        if(!category){
            return response(res,404,false,"","category no encontrado")
        }


        response(res,200,true,category,"category encontrado")
        

    } catch (error) {
        response(res,500,false,"",error.message)
    }
}




categoryCtrol.add=async(req,res)=>{
    try {


        const {title,description} = req.body
        const newcategory= new categoryModel ({
            title,
            description,
        });



        if(req.file){
         const {secure_url,public_id}  = await subirImagenACloudinary(req.file)
         newcategory.setImg({secure_url,public_id});
        }
            
        
        await categoryModel.create(newcategory);
        response(res,201,true,newcategory,"category creado correctamente ");
        
    } catch (error) {
        response(res,500,false,"",error.message)
    }
};


categoryCtrol.delete = async (req,res) => {
    try {


        const {id} = req.params;

        const category = await categoryModel.findById(id)


        if(!category){
            return response(res,404,false,"","category no encontrado ")}

        
        if(category.public_id){
            await eliminarImagenCloudinary(category.public_id)
        }

        await category.deleteOne();

        response(res,200,true,"","category eliminado correctamente")

    } catch (error) {
        response(res,500,false,"",error.message)
    }
}


postCtrol.update = async (req,res) => {
    try {

        const {id} = req.params;

        const post = await postModel.findById(id)


        if(!post){
            return response(res,404,false,"","Post no encontrado")}

       

        if(req.file){

            if(post.public_id){
                await eliminarImagenCloudinary(post.public_id)
            }
            const {secure_url,public_id}  = await subirImagenACloudinary(req.file)
            post.setImg({secure_url,public_id});
            await post.save()
        }


        await post.updateOne(req.body);

        response(res,200,true,"","category actualizado ")

    } catch (error) {
        response(res,500,false,"",error.message)
    }
}



export default postCtrol;