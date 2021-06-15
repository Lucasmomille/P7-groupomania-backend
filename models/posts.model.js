module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        title: {
            type: Sequelize.STRING
        },
        imageUrl: {
            type: Sequelize.STRING
        },
        users_like: {
            type: Sequelize.INTEGER
        }
    });

    return Post;
};