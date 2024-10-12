import express from 'express'
import userRouters from './user.router.js';
import VideoRoutes from './video.router.js';
//tao object router tong 
const rootRouters = express.Router()

rootRouters.use("/users",userRouters);
rootRouters.use("/videos",VideoRoutes)
export default rootRouters;