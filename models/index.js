
//Taken help from Module 13 
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


User.hasMany(Post, {
    foreignKey: 'userId'
})

User.hasMany(Comment, {
    foreignKey: 'userId'
})

Post.belongsTo(User, {
    foreignKey: 'userId'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

Comment.belongsTo(User, {
    foreignKey: 'userId'
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})


module.exports = {
    User,
    Post,
    Comment
};