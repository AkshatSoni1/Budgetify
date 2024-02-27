import mongoose, { Schema, model, models } from "mongoose";

const updationSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description:{
        type: String,
        required:[true, "Description is required"]
    },
    operation:{
        type: String,
        required:[true, "Operation is required"]
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

const UpdateLimit = mongoose.models.UpdateLimit || mongoose.model('UpdateLimit', updationSchema)
export default UpdateLimit;