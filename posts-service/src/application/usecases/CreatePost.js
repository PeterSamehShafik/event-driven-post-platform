
import PostRepository from '../../infrastructure/database/repositories/MongoPostRepository.js'
import PostEventPublisher from '../../infrastructure/messaging/PostEventPublisher.js'
import ValidationError from '../../domain/errors/ValidationError.js'
import Post from '../../domain/entities/Posts.js';

class CreatePost {
  async execute(data) {
    const post = new Post(data);        
    const saved = await PostRepository.save(post); 
    await PostEventPublisher.publishPostCreated(saved);

    return saved;
  }
}

export default new CreatePost();