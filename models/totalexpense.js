import mongoose, { Schema, model, models } from "mongoose";

const totalexpenseSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    amount:{
        type: Number,
        required:[true, "Amount is required"]
    },
    maximum:{
        type: Number,
        required:[true, "Amount is required"]
    },
    month: {
        type: Number,
        required: [true, 'Month is required']
    },
    year: {
        type: Number,
        required: [true, 'Year is required']
    }
})

const TotalExpense = mongoose.models.TotalExpense || mongoose.model('TotalExpense', totalexpenseSchema)
export default TotalExpense;