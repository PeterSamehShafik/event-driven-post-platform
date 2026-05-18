import Post from '../../domain/entities/Posts.js';

class CreatePost {
  constructor(postRepository, eventPublisher) {
    this.postRepository = postRepository;
    this.eventPublisher = eventPublisher;
  }

  async execute(data) {
    const post = new Post(data);
    const saved = await this.postRepository.save(post);
    await this.eventPublisher.publishPostCreated(saved);
    return saved;
  }
}

export default CreatePost;  