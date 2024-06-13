import express from 'express';
import {
  getAllCampaigns,
  campaignById,
  createCampaign,
  deleteCampaign,
  updateCampaign,
} from './campaign.controller.js';
import { uploadImageToCloudinary } from '../../config/cloudinary/uploadImage.js';
import { upload } from '../../config/cloudinary/multer.js';
import { authenticateEntiti } from './middlewareCampaign.js';
import { protect } from '../Users/users.middleware.js';

export const router = express.Router();

// router.use(authenticateEntiti);

router
  .route('/')
  .get(getAllCampaigns)
  .post(
    upload.single('image'),
    uploadImageToCloudinary,
    protect,
    createCampaign
  );

router
  .route('/:id')
  .get(campaignById)
  .patch(updateCampaign)
  .delete(deleteCampaign);
