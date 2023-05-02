// importing packages
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// creating the parent class

class Comment extends Model {}

// the comment model needs to have its own id and also the user's id
// and post id so that it can be matched to a user and a post
// comment text is what shows up as the comment after the post

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            },
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "post",
                key: "id",
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: "comment",
    }
);

// exporting 
module.exports = Comment;