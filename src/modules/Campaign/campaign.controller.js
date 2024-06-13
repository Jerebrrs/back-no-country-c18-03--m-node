import { AppError, catchAsync } from '../../errors/index.js';
import { entitiesService } from '../Entities/entitites.controller.js';
import { validatePostCampaign, campaignUpdate } from './campaign.schema.js';
import { CampaignService } from './campaing.service.js';
import { errorMessagesCampaing } from '../../common/utils/errorsMessages.js';
import { sucessMessage } from '../../common/utils/sucessMessage.js';

const campaignService = new CampaignService();

export const getAllCampaigns = catchAsync(async (req, res, next) => {
  const campaign = await campaignService.getAllCampaigns();

  return res.status(200).json(campaign);
});

export const campaignById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const campaign = await campaignService.findOneById(id);

  if (!campaign) {
    return next(new AppError(errorMessagesCampaing.campaingNotExist, 404));
  }

  return res.status(200).json(campaign);
});

export const createCampaign = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, campaignData } = validatePostCampaign(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const { sessionUser } = req;

//   if (sessionUser && sessionUser.id) {
// console.log(sessionUser);

//     campaignData.entitiId = sessionUser.id ? 10 : null;;
//   } else {
//     return res.status(400).json({
//       status: 'error',
//       message: 'Entiti ID is required',
//     });
//   }

  const campaign = await campaignService.createCampaign(
    campaignData,
    sessionUser
  );

  if (!campaign) {
    return next(new AppError(errorMessagesCampaing.campaingNotExist, 404));
  }

  return res.status(201).json(campaign);
});

export const updateCampaign = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, campaignData } = campaignUpdate(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const { id } = req.params;

  const campaing = await campaignService.findOneById(id);

  if (!campaing) {
    return next(new AppError(errorMessagesCampaing.campaingNotExist, 404));
  }

  const updateCampaign = await campaignService.updateCampaign(
    campaing,
    campaignData
  );

  return res.status(200).json(updateCampaign);
});

export const deleteCampaign = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const campaign = await campaignService.findOneById(id);

  if (!campaign) {
    return next(new AppError(errorMessagesCampaing.campaingNotExist, 404));
  }

  await campaignService.deleteCampaign(campaign);

  return res.status(200).json({ message: sucessMessage.campaingDelete });
});
