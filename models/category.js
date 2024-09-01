import pkg from 'mongoose';

const { Schema, model, models } = pkg;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

export const Category = models.Category || model('Category', schema);