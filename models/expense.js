import mongoose, { Schema, model, models } from "mongoose";

const expenseSchema = new Schema({
    budgetId: {
        type: Schema.Types.ObjectId,
        ref: 'Budget'
    },
    name: {
        type: String,
        required: [true, 'Name of expense is required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount spent is required']
    }
});

const Expense = mongoose.models.Expense || mongoose.model("Expense", expenseSchema);
export default Expense;