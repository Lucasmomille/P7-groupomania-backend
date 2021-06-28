module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        message: {
            type: Sequelize.STRING,
            allowNull: false
        },

        isAnswer: {
            type: Sequelize.BOOLEAN
        },

        answerTo: {
            type: Sequelize.INTEGER
        }
    });

    return Comment;
};