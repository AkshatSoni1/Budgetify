import mongoose, { Schema, model, models } from "mongoose";

const budgetSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Name of budget is required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    month: {
        type: Number,
        required: [true, 'Month is required']
    },
    year: {
        type: Number,
        required: [true, 'Year is required']
    }
});

const Budget = mongoose.models.Budget || mongoose.model('Budget', budgetSchema);
export default Budget;