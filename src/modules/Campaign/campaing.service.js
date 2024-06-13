import Entities from '../Entities/entities.model.js';
import Campaign from './campaign.model.js';

export class CampaignService {
  async getAllCampaigns() {
    return await Campaign.findAll({
      where: {
        status: true,
      },
    });
  }

  async findOneById(id) {
    return await Campaign.findOne({
      where: {
        id,
        status: true,
      },
      include: [{ model: Entities }],
    });
  }

  async createCampaign(data, sessionUser) {
    data.entitiId = sessionUser;
    return await Campaign.create(data);
  }

  async updateCampaign(campaign, data) {
    return await campaign.update(data);
  }

  async deleteCampaign(campaign) {
    return await campaign.update({
      status: false,
    });
  }
}
