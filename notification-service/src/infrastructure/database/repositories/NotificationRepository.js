import NotificationModel from '../schemas/notificationSchema.js'

class NotificationRepository {
    async save(data) {
        const doc = new NotificationModel(data)
        return await doc.save()
    }

}

export default NotificationRepository