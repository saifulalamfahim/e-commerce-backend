
import Jwt from "jsonwebtoken";
import config from "./config";

export const generateToken = (user) =>{
    return Jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin:user.isAdmin,
    },
    config.JWT_SECRET
    );
};