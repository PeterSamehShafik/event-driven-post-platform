export const POST_CREATED_EVENT_TYPE = 'post.created';
export const POST_CREATED_EVENT_VERSION = '1.0';

export function createPostCreatedEvent(post) {
  return {
    eventType: POST_CREATED_EVENT_TYPE,
    version: POST_CREATED_EVENT_VERSION,
    timestamp: new Date().toISOString(),
    payload: {
      postId: post._id.toString(),
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
    },
  };
}

export function validatePostCreatedEvent(event) {
  const required = ['postId', 'title', 'content', 'createdAt'];
  const missing = required.filter(field => !event.payload?.[field]);
  if (missing.length > 0) {
    throw new Error(`Invalid PostCreatedEvent — missing: ${missing.join(', ')}`);
  }
  return true;
}