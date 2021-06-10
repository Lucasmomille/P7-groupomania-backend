module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        title: {
            type: Sequelize.STRING
        },
        imageUrl: {
            type: Sequelize.STRING
        },
        // posted_at ?
        /*  postedAt: {
             type: Sequelize.DATE
         } */
    });

    return Post;
};