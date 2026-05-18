import PostRepository from '../../infrastructure/database/repositories/MongoPostRepository.js';

class GetPost {
  async execute(id) {
    const post = await PostRepository.findById(id);
    return post;
  }
}

export default new GetPost();