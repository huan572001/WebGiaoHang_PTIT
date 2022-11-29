const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define("Order", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      id_Customer: {
        type: DataTypes.INTEGER
      },
      id_Shipper: {
        type: DataTypes.INTEGER
      },
      nameReceiver: {
        type: DataTypes.STRING
      },
      addressReceiver: {
        type: DataTypes.STRING
      },
      phoneReceiver: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.BOOLEAN
      },
      commodities: {
        type: DataTypes.STRING
      },
  }, {
    freezeTableName: 'order',
  });

  Model.associate = models => {
    Model.belongsTo(models.Customer, {
      foreignKey: 'id_Customer',
      as:'customer'
    })
    Model.belongsTo(models.Shipper, {
      foreignKey: 'id_Shipper',
      as:'shipper'
    })
  }
  return Model;
};

// Post.sync({force : true}).then((data) => {
//     console.log("Successfully!")
// }).catch((err) => {
//   console.log(err)
// })