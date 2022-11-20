const {productModel} = require("../model/DBmodel");

const addProduct = async (product) => {
    try {
        let data = new productModel(product);
        data.save();
        return "done";
    } catch (e) {
        throw e;
    }
}

const showProducts = async () => {
    try {
        const duc = await productModel.find();
        return duc;
    } catch (e) {
        throw e;
    }
}

const getById = async (id) => {
    try {
        const duc = await productModel.findById(id);
        return duc;
    } catch (e) {
        throw e;
    }
}

const deleteBYId = async (id) => {
    try {
        await productModel.findByIdAndRemove(id);
        return "done";
    } catch (e) {
        throw e;
    }
}

const updateById = async (id, newInfo) => {
    try {
        await productModel.findByIdAndUpdate(id, newInfo)
        return "done";
    } catch (e) {
        throw e;
    }
}
module.exports = {addProduct, showProducts, getById, deleteBYId, updateById};