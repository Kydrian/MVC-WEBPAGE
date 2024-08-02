const User = require('./user');
const Comment = require('./comments');
const BlogPost = require('./blogpost');

BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
});


BlogPost.hasMany(Comment, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE',
});


Comment.belongsTo(User, {
    foreignKey: 'user_id'
});


Comment.belongsTo(BlogPost, {
    foreignKey: 'blogpost_id',
});

module.exports = { User, Comment, BlogPost }