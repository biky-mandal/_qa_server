import pkg from 'mongoose';

const { Schema, model, models } = pkg;

const schema = new Schema({
    value: {
        type: String,
        required: true,
    },
    answer: {
        type: Schema.Types.ObjectId,
        ref: 'Answer',
    },
    options: [{
        key: {
            type: String,
            enum: ['A', 'B', 'C', 'D'],
            required: true,
        },
        value: {
            type: String,
            required: true,
        }
    }],
    eventDate: {
        type: 'string',
        required: true,
    },
    countries: [{
        type: Schema.Types.ObjectId,
        ref: 'Country',
    }],
    states: [{
        type: Schema.Types.ObjectId,
        ref: 'State',
    }],
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }],
    subCategories: [{
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

export const Question = models.Question || model('Question', schema);