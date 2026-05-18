
import IPostRepository from '../../../domain/repositories/IPostRepository.js'
import NotFoundError from '../../../domain/errors/NotFoundError.js'
import PostModel from "../schemas/postSchema.js"

class MongoPostRepository extends IPostRepository {
    async save(data) {
        const post = new PostModel(data);
        return await post.save();
    }

    async findById(id) {
        const post = await PostModel.findById(id);
        if (!post) throw new NotFoundError('Post');
        return post;
    }

    async findAll() {
        return await PostModel.find().sort({ createdAt: -1 });
    }
}

export default new MongoPostRepository()