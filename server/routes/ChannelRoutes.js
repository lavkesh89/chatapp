import { Router } from 'express';
import { verifyToken } from './../middlewares/AuthMiddleware.js';
import { createChannel, getuserChannels } from './../controllers/ChannelController.js';

const channelRoutes = Router();

channelRoutes.post("/create-channel", verifyToken, createChannel);
channelRoutes.get("/get-user-channels", verifyToken, getuserChannels);

export default channelRoutes;
