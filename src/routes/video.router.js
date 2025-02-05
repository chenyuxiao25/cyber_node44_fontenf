import express from 'express'
import { getListVideo,getType ,getListVideoType,getVideoPage} from '../controllers /video.controller.js';
   const VideoRoutes = express.Router();
VideoRoutes.get('/get-videos',getListVideo)
VideoRoutes.get('/get-type',getType)
VideoRoutes.get('/get-video-type-by-id/:typeId',getListVideoType)
VideoRoutes.get('/get-video-page/:page/:size',getVideoPage)
   export default VideoRoutes;