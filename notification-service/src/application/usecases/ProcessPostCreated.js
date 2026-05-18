class ProcessPostCreated {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository
    }

    async handle(event) {
        const notification = {
            eventType: event.eventType,
            postId: event.payload.postId,
            title: event.payload.title,
            status: 'processed'
        }
        const saved = await this.notificationRepository.save(notification)
        console.log('Notification saved', {
            notificationId: saved._id.toString(),
            postId: notification.postId,
            eventType: notification.eventType,
        });
    }
}

export default ProcessPostCreated;
