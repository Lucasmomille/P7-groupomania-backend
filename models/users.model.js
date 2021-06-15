module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
        //Besoin de mettre create_time?
    });

    return User;
};