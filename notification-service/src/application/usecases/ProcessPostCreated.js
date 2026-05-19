import { validatePostCreatedEvent } from '@myapp/shared-events/events/post-created.event.js';


class ProcessPostCreated {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository
    }

    async handle(event) {
        validatePostCreatedEvent(event)

        const existing = await this.notificationRepository.findByPostId(event.payload.postId);
        if (existing) {
            console.info('Duplicate event ignored', { postId: event.payload.postId });
            return;
        }

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
