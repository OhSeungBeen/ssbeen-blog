const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            contents: {
                type: Sequelize.STRING(140),
                allowNull: true,
            },
            image: {
                type: Sequelize.STRING(200),
                allowNull: true,
            }
        },{
            sequelize,
            timestemps: true, // createAt, updateAt
            underscored: false, // code style
            paranoid: false,
            modelName : 'Post', // javascript name
            tableName: 'posts', // sql name
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Post.belongsTo(db.User);
    }
}