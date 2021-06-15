module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes", {
        name: {
            type: DataTypes.STRING,
        },
    });

    return Likes;
};