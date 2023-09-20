module.exports = (sequelize, DataType) => {

    const users = sequelize.define("users", {
        username: {
            type: DataType.STRING,
            allowNull: false,
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
        }

    });

    users.associate = (models) => {
        users.hasMany(models.Elements, {
            onDelete: "cascade",
        });


    };

    return users;
};