import Campaign from './campaign.model.js';
import Entities from "../Entities/entities.model.js";


export class CampaignService {
    async getAllCampaigns() {
        return await Campaign.findAll({
            where: {
                status: true
            }
        });
    }
    async createCampaign(data) {
        return await Campaign.create(data)
    };

    async findOneById(id) {
        return await Campaign.findOne({
            where: {
                id,
                status: true
            }
        })
    };

    async updateCampaign(campaign, data) {
        return await campaign.update(data)
    };

    async deleteCampaign(campaign) {
        return await campaign.update({
            status: false
        })
    };

};