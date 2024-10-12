import express from "express"
import { createUser, deleteUser, getUsers ,updateUser} from "../controllers /user.controller.js";

const userRouters = express.Router();
userRouters.post("/create-users",createUser)

userRouters.get("/get-users",getUsers)
userRouters.delete("/delete-user/:user_id",deleteUser)
userRouters.put('/update-user/:user_id',updateUser)
export default  userRouters