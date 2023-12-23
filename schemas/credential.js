module.exports = (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const Credentials = sequelize.define(
    "credentials",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        min: 5,
        max: 100,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        min: 5,
        max: 100,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        min: 5,
        max: 100,
      }, createdAt: {

        field: 'createdAt',
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },

      updatedAt: {
        field: 'updatedAt',
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      }
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      // define the table's name
      tableName: "credentials",
    }
  );

  return Credentials;
};
