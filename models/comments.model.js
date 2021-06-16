module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        message: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // Boolean ou string ?
        isAnswer: {
            type: Sequelize.BOOLEAN
        },
        // posted_at ?
        answerTo: {
            type: Sequelize.INTEGER
        }
    });

    return Comment;
};