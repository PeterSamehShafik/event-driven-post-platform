import { kafka, producer, CompressionTypes } from './kafkaClient.js';
import { createPostCreatedEvent, validatePostCreatedEvent } from '@myapp/shared-events/events/post-created.event.js';



class PostEventPublisher {

  async publishPostCreated(post) {
    const topic = process.env.POST_CREATED_TOPIC;
    const event = createPostCreatedEvent(post)

    // const event = {
    //   eventType: process.env.POST_CREATED_TOPIC,
    //   timestamp: new Date().toISOString(),
    //   payload: {
    //     postId: post._id.toString(),
    //     title: post.title,
    //     content: post.content,
    //     createdAt: post.createdAt,
    //   },
    // };

    validatePostCreatedEvent(event);

    await producer.send({
      topic,
      messages: [
        {
          key: post._id.toString(),
          value: JSON.stringify(event),
        },
      ],
      acks: -1,
      compression: CompressionTypes.Snappy

    });

    console.log('Event published', {
      eventType: event.eventType,
      postId: event.payload.postId,
      topic,
    });
  }

}

export default PostEventPublisher