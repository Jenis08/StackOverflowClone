import mongoose from "mongoose";
const {Schema, model} = mongoose;

const QueScheme = new Schema({
    userID: {type : Schema.Types.ObjectId, ref: 'User'},
    question: {type: String, required: true},
    upvotes: {type: Number, default: 0},
    downvotes: {type: Number, default: 0},
    comments: {
        type: Array,
        default: []
    }
});

export const Question = model('Question', QueScheme);

