module.exports = (sequelize, DataType) => {

    const Elements = sequelize.define("Elements", {
        title: {
            type: DataType.STRING,
            allowNull: false,
        },
        info: {
            type: DataType.STRING,
            allowNull: false,
        },
        shop: {
            type: DataType.STRING,
            allowNull: false,
        },
        username: {
            type: DataType.STRING,
            allowNull: false,
        },
    });

    return Elements;
};