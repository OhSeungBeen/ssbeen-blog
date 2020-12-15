const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // auto insert id
            // id: {
            //     type: Sequelize.INTEGER, // INT
            //     primaryKey: true,
            //     autoIncrement: true,
            // },
            nickName: {
                type: Sequelize.STRING(20),
                allowNull: false, // NOT NULL
                unique: true //UNIQUE
            },
            email: {
                type: Sequelize.STRING(40),
                allowNull: false, // NOT NULL
                unique: true // UNIQUE
            },
            password: {
                type: Sequelize.STRING(100), // hash encryption
                allowNull: true,  // NULL // SNS login
            },
            provider: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local' // defalut local login
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            }
        },{
            sequelize,
            timestemps: true, // createAt, updateAt
            underscored: false, // code style
            paranoid: true, // deleteAt
            modelName : 'User', // javascript name
            tableName: 'users', // sql name
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Post);
    }
}