import express from 'express'
import userRouters from './user.router.js';
//tao object router tong 
const rootRouters =express.Router()

rootRouters.use("/users",userRouters)
export default rootRouters;