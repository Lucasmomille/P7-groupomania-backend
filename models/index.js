const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.posts = require("./posts.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.comments = require("./comments.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.likes = require("../models/likes.model.js")(sequelize, Sequelize);


db.role.belongsToMany(db.users, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.users.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

// Users and posts relationship
db.users.hasMany(db.posts, {
    as: "posts",
    onDelete: "cascade"
})
db.posts.belongsTo(db.users, {
    foreignKey: "userId",
    as: "users",
});

// Users and comments relationship
db.users.hasMany(db.comments, {
    as: "comments",
    onDelete: "cascade"
})
db.comments.belongsTo(db.users, {
    foreignKey: "userId",
    as: "users",
});


// Posts and comments relationship
db.posts.hasMany(db.comments, {
    as: "comments",
    onDelete: "cascade"
})
db.comments.belongsTo(db.posts, {
    foreignKey: "postId",
    as: "posts",
});


db.posts.hasMany(db.likes, {
    as: "likes",
    onDelete: "cascade"
})
db.likes.belongsTo(db.posts, {
    foreignKey: "postId",
    as: "posts",
});

db.users.hasMany(db.likes, {
    as: "likes",
    onDelete: "cascade"
})
db.likes.belongsTo(db.users, {
    foreignKey: "userId",
    as: "users",
});


module.exports = db;