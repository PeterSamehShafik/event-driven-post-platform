// infrastructure/messaging/PostEventPublisher.js
import { producer } from './kafkaClient.js';

class PostEventPublisher {

  async publishPostCreated(post) {
    const topic = process.env.POST_CREATED_TOPIC;

    const event = {
      eventType: process.env.POST_CREATED_TOPIC,
      timestamp: new Date().toISOString(),
      payload: {
        postId: post._id.toString(),
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
      },
    };

    await producer.send({
      topic,
      messages: [
        {
          key: post._id.toString(),
          value: JSON.stringify(event),
        },
      ],
    });

    console.log('Event published', {
      eventType: event.eventType,
      postId: event.payload.postId,
      topic,
    });
  }

}

export default new PostEventPublisher();