import Entities from "./entities.model.js";

export class EntitiesService {

    async findAllEntities() {
        return Entities.findAll({
            where: {
                status: true
            }
        })
    }

    async findOneEntities(id) {
        return Entities.findOne({
            where: {
                status: true,
                id: id
            }
        })
    }

    async createEntities(data) {
        return Entities.create(data)
    }

    async updateEntities(entity, data) {
        return await entity.update(data)
    }

    async deleteEntities(entity) {
        return await entity.update({
            status: false
        })
    }
}