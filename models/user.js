import pkg from 'mongoose';
import { hash } from 'bcrypt';

const { Schema, model, models } = pkg;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        required: true,
        type: String,
        enum: ['user', 'author', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

schema.pre('save', async function (next) {
    if (!this.isModified('password')) next(); // if user dont modifies password
    this.password = await hash(this.password, 12);
});

export const User = models.User || model('User', schema);