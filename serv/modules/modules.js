const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})  

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true},
    countDevice: {type: DataTypes.REAL, defaultValue: 0},
})  
    
const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,  allowNull:false},   
    price: {type: DataTypes.REAL, allowNull:false},
    img: {type: DataTypes.STRING,allowNull:false},
})  
const DeviceTable = sequelize.define('device_table', {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,  allowNull:false},   
    serialnumber: {type: DataTypes.STRING,  allowNull:false},
    count: {type: DataTypes.REAL, defaultValue: 0},
    price: {type: DataTypes.REAL, allowNull:false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
})  

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
}) 

const Rating = sequelize.define('rating',    {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
}) 
const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
}) 

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false},
}) 

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true},
}) 

const UserOrders = sequelize.define('user_orders', {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true}, // userid,
    orderNumber: {type: DataTypes.CHAR},
    mail: {type: DataTypes.CHAR},   
    phone: {type: DataTypes.CHAR},   
    FIO: {type: DataTypes.CHAR},
    sum: {type: DataTypes.REAL},
    status: {type: DataTypes.CHAR},    
})

const Orders = sequelize.define('orders', {
    id: {type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true}, 
    countDevice: {type: DataTypes.REAL, defaultValue: 0},
    price: {type: DataTypes.REAL, defaultValue: 0},
    nevermore: {type: DataTypes.STRING, defaultValue: 0},
    DeviceId: {type: DataTypes.REAL, defaultValue: 0},

    //deviceId, orderId DeviceId
})



User.hasOne(UserOrders) // При создании user, создается UserOrders 
UserOrders.belongsTo(User)

Orders.hasMany(Device)
Device.belongsTo(Orders)

User.hasMany(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Type.hasMany(Device)
Device.belongsTo(Type)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Brand.hasOne(Device)
Device.belongsTo(Brand)

DeviceTable.hasOne(Device)

Device.hasMany(Basket)
Basket.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: "info"});
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand ,{through: TypeBrand})
Brand.belongsToMany(Type ,{through: TypeBrand})


module.exports = {
    User, 
    Basket,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo,
    DeviceTable,
    UserOrders,
    Orders,
}
