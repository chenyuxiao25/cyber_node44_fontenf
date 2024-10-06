import express from "express"
import { createUser, deleteUser, getUsers } from "../models/user.controller.js";
//import pool from "../../db.js"

//import { INTERNAL_SEVER, OK } from "../../const.js";

const userRouters = express.Router();
userRouters.post("/:id/:hoten",createUser)

userRouters.get("/get-users",getUsers)
userRouters.delete("/delete-user/:user_id",deleteUser)

export default  userRouters