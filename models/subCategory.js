import pkg from 'mongoose';

const { Schema, model, models } = pkg;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true });

export const SubCategory = models.SubCategory || model('SubCategory', schema);