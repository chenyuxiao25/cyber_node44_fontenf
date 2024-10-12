import express from 'express'
import { getListVideo } from '../controllers /video.controller.js';
   const VideoRoutes = express.Router();
VideoRoutes.get('/get-videos',getListVideo)
   export default VideoRoutes;