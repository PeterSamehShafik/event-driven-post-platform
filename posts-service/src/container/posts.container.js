
import MongoPostRepository from '../infrastructure/database/repositories/MongoPostRepository.js';
import PostEventPublisher from '../infrastructure/messaging/PostEventPublisher.js';
import CreatePost from '../application/usecases/CreatePost.js';
import GetPost from '../application/usecases/GetPost.js';
import ListPosts from '../application/usecases/ListPosts.js';

const postRepository = new MongoPostRepository();
const eventPublisher = new PostEventPublisher();

const createPost = new CreatePost(postRepository, eventPublisher);
const getPost = new GetPost(postRepository);
const listPosts = new ListPosts(postRepository);

export { createPost, getPost, listPosts };