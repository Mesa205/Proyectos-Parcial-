import { response } from "../helpers/Response.js";
import { userModel } from "../models/user.models.js";
import { data } from "./data.js";

export const seedDt = async (req, res) => {
    try{

    await userModel.deleteMany();

    const user = await userModel.create(data);
    response(res, 201, true, user, "seed ejecutada");

    }catch(error) {
        response(res, 500, false, "", error.message);
    }

};