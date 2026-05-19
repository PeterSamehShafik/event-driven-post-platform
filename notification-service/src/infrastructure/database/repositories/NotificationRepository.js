import NotificationModel from '../schemas/notificationSchema.js'

class NotificationRepository {
    async save(data) {
        const doc = new NotificationModel(data)
        return await doc.save()
    }

    async findById(id) {
        const doc = await NotificationModel.findById(id)
        return doc
    }

}

export default NotificationRepository