import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js"
import { encryptedPassword } from "../../config/plugins/encrypted-password.js"

const Entities = sequelize.define(
    'entities',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false,
        },
        bankInformation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        entityName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
    hooks: {
        beforeCreate: async (user) => {
            user.password = await encryptedPassword(user.password)
        },
    }
})

export default Entities;