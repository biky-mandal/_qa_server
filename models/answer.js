import pkg from 'mongoose';

const { Schema, model, models } = pkg;

const schema = new Schema({
    key: {
        type: String,
        enum: ['A', 'B', 'C', 'D'],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

export const Answer = models.Answer || model('Answer', schema);