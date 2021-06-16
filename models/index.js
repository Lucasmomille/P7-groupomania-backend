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
db.likes = require("./likes.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

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
})
db.posts.belongsTo(db.users, {
    foreignKey: "userIdFk",
    as: "users",
});

// Users and comments relationship
db.users.hasMany(db.comments, {
    as: "comments",
})
db.comments.belongsTo(db.users, {
    foreignKey: "userIdFk",
    as: "users",
});


// Posts and comments relationship
db.posts.hasMany(db.comments, {
    as: "comments",
})
db.comments.belongsTo(db.posts, {
    foreignKey: "commentsIdFk",
    as: "posts",
});

// Comments relationship auto
db.comments.hasMany(db.comments, {
    as: "comments_response",
})
db.comments.belongsTo(db.comments, {
    foreignKey: "commentsResIdFk",
    as: "comments",
});

// Posts and Likes relationships
db.likes.belongsToMany(db.posts, {
    through: "posts_like",
    as: "posts",
    foreignKey: "likeIdFk"
});

db.posts.belongsToMany(db.likes, {
    through: "posts_like",
    as: "user_like",
    foreignKey: "postIdFk",
})

module.exports = db;