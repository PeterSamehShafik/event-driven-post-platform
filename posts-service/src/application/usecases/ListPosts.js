import PostRepository from '../../infrastructure/database/repositories/MongoPostRepository.js';

class ListPosts {
  async execute() {
    const posts = await PostRepository.findAll();
    return posts;
  }
}

export default new ListPosts();