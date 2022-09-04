import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        price: {type: Number, required: true},
        url: {type: String, required: true}
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Product", productSchema)

export default Product