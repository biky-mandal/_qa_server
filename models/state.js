import pkg from 'mongoose';

const { Schema, model, models } = pkg;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    }
}, { timestamps: true });

export const State = models.State || model('State', schema);