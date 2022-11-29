const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique : true,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },

  }, {
    freezeTableName: 'user',
  });

  Model.associate = models => {
    // Model.belongsTo(models.Post, {
    //   foreignKey: "userId",
    //   as: 'menber'
    // })
  }
  return Model;
};

// User.sync({force : true}).then((data) => {
//     console.log("Successfully!")
// }).catch((err) => {
//   console.log(err)
// })