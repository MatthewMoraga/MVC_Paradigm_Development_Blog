// importing the models
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// setting up the relationship bewteen the models so that the when the user
// creates a blog post, or a comment, then the models are matched together based on ids
// and matching foreign keys with the ids 

User.hasMany(Post, {
    foreignKey: "user_id"
});

Post.belongsTo(User, {
    foreignKey: "user_id",
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
});

Comment.belongsTo(Post, {
    foreignKey: "post_id",
});

Post.hasMany(Comment, {
    foreignKey: "post_id",
});

User.hasMany(Comment, {
    foreignKey: "user_id",
});

// exporting
module.exports = { User, Post, Comment };