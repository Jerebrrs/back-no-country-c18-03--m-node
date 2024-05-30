import express from 'express';
import {
    getAllCampaigns,
    campaignById,
    createCampaign,
    deleteCampaign,
    updateCampaign
} from './campaign.controller.js';
import { uploadImageToCloudinary } from '../../config/cloudinary/uploadImage.js'
import { upload } from '../../config/cloudinary/multer.js'
export const router = express.Router();

router.route('/')
    .get(getAllCampaigns)
    .post(upload.single('image'), uploadImageToCloudinary, createCampaign);

router.route('/:id')
    .get(campaignById)
    .patch(updateCampaign)
    .delete(deleteCampaign)

