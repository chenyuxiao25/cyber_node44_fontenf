import express from 'express'
import userRouters from './user.router.js';
import VideoRoutes from './video.router.js';
import authRouter from './auth.router.js';
//tao object router tong 
const rootRouters = express.Router()

rootRouters.use("/users",userRouters);
rootRouters.use("/videos",VideoRoutes)
rootRouters.use("/auth",authRouter)
export default rootRouters;