const {userModel, productModel, orderModel} = require("../model/DBmodel");

const order = async (userId, productId) => {
    try {
        const duc = await orderModel.find({userId: userId});
        if (duc.length === 0) {
            let data = new orderModel({
                userId: userId,
                orders: [{productId: productId, count: 0}]
            });
            data.save();
            return "done";
        } else {
            const index = duc[0].orders.findIndex((input) => {
                return input.productId == productId;
            })
            if (index === -1) {
                duc[0].orders.push({productId: productId, count: 0});
                await orderModel.findOneAndUpdate({userId: userId}, duc[0]);
            } else {
                duc[0].orders[index].count += 1;
                await orderModel.findOneAndUpdate({userId: userId}, duc[0]);
            }
            return "done";
        }
    } catch (e) {
        throw e;
    }
}

const showCart = async (userId) => {
    try {
        const duc = await orderModel.find({userId: userId});
    } catch (e) {
        throw e;
    }
}
module.exports = {order, showCart};