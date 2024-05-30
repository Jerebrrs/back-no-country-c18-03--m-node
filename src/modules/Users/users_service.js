import Entities from "../Entities/entities.model.js"
import User from "./user.model.js"

export class UserServices {

    async findAll() {
        return await User.findAll({
            where: {
                status: true
            }
        })
    }

    async findOneById(id) {
        return await User.findOne({
            where: {
                id,
                status: true
            }
        })
    }

    async createUser(data) {
        return await User.create(data)
    }

    async updateUser(user, data) {
        return await user.update(data)
    }

    async deleteUser(user) {
        return await user.update({
            status: false
        })
    }

    async findUserByEmail(email) {
        let user = await User.findOne({ where: { email } })

        if (!user) {
            user = await Entities.findOne({ where: { email } })
        }

        return user;
    }

}