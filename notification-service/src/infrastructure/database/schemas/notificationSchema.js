import { Schema, model } from 'mongoose'

const NotificationSchema = new Schema({
    eventType: { type: String, required: true },
    postId: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, default: 'processed' },
}, { timestamps: true });

export default model('notification', NotificationSchema)