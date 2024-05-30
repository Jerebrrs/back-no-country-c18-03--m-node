import { AppError, catchAsync } from '../../errors/index.js';
import { entitiesService } from '../Entities/entitites.controller.js';
import { validatePostCampaign, campaignUpdate } from './campaign.schema.js';
import { CampaignService } from './campaing.service.js';

const campaignService = new CampaignService();

export const getAllCampaigns = catchAsync(async (req, res, next) => {
    const campaign = await campaignService.getAllCampaigns();

    return res.status(200).json(campaign);
});

export const campaignById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const campaign = await campaignService.findOneById(id);

    if (!campaign) {
        return next(new AppError('This campaingn does not exist', 404));
    };

    return res.status(200).json(campaign);
});

export const createCampaign = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, campaignData } = validatePostCampaign(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        });
    }

    const { id } = req.params;

    const entity = await entitiesService.findOneEntities(id);

    if (!entity) {
        return next(new AppError('This entity does not exist', 404));
    };

    const campaign = await campaignService.createCampaign(campaignData);

    if (!campaign) {
        return next(new AppError('This campaign does not exist', 404));
    };

    return res.status(201).json(campaign);
});

export const updateCampaign = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, campaignData } = campaignUpdate(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        });
    }

    const { id } = req.params;

    const campaing = await campaignService.findOneById(id);

    if (!campaing) {
        return next(new AppError('This campaing does not exist', 404));
    };

    const updateCampaign = await campaignService.updateCampaign(campaing, campaignData);

    return res.status(200).json(updateCampaign);
});

export const deleteCampaign = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const campaign = await campaignService.findOneById(id);

    if (!campaign) {
        return next(new AppError('This campaign does not exist', 404));
    }

    await campaignService.deleteCampaign(campaign);

    return res.status(200).json({ message: 'Campaign deleted successfully' });
});