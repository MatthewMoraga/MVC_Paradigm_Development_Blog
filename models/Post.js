// importing packages
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// creating the parent class

class Post extends Model {}

// setting the Post model to have an id, title, content, and user_id
// the post should have an id so that it can be unique to the user who creates a post
// then the id auto_increments so that all ids can have a unique id
// user_id object is set to match with the key of id from the user model
// so that when a user looks at or creates post then it shows the user 
// who created the post and when

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: 1,
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: "post",
    }
);

// exporting
module.exports = Post;