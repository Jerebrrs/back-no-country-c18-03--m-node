import Campaign from '../../modules/Campaign/campaign.model.js';
import Entities from '../../modules/Entities/entities.model.js';


export const initModel = () => {
    Entities.hasMany(Campaign, { foreignKey: 'entitiId' });
    Campaign.belongsTo(Entities, { foreignKey: 'entitiId' });
};
