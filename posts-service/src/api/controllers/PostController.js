import { createPost, getPost, listPosts } from '../../container/index.js';

import sendSuccess from "../helpers/response.js";
import asyncHandler from "../routes/asyncHandler.js";

class PostController {
  create = asyncHandler(async (req, res) => {
    const post = await createPost.execute(req.body);
    sendSuccess(res, post, 201)
  })

  list = asyncHandler(async (req, res) => {
    const post = await listPosts.execute();
    sendSuccess(res, post, 200)

  })

  getById = asyncHandler(async (req, res) => {
    const post = await getPost.execute(req.params.id);
    sendSuccess(res, post, 200)
  })

};
export default new PostController()