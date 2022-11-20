const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        currentHP: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: true },
    };

    return sequelize.define('Monsters', attributes);
}