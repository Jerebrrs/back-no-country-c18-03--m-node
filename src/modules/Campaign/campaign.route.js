import express from 'express';
import { getAllCampaigns, campaignById, createCampaign, deleteCampaign, updateCampaign } from './campaign.controller.js';

export const router = express.Router();

router.route('/')
    .get(getAllCampaigns)
    .post(createCampaign)

router.route('/:id')
    .get(campaignById)
    .patch(updateCampaign)
    .delete(deleteCampaign)
    
