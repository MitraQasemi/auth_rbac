const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    password: String,
    roles: Object,
    refreshToken: String,
    addresses: []
})
const userModel = mongoose.model('Users', User);

const product = new Schema({
    name: String,
    price: String
})
const productModel = mongoose.model('products', product);

const order = new Schema({
    userId: Schema.Types.ObjectId,
    orders: [{
        productId: Schema.Types.ObjectId,
        count : 0
    }]
})
const orderModel = mongoose.model('orders', order);

module.exports = {userModel, productModel, orderModel};