import CreatePost from "../../application/usecases/CreatePost.js";
import GetPost from "../../application/usecases/GetPost.js";
import ListPosts from "../../application/usecases/ListPosts.js";
import sendSuccess from "../helpers/response.js";
import asyncHandler from "../routes/asyncHandler.js";

class PostController {
  create = asyncHandler(async (req, res) => {
    const post = await CreatePost.execute(req.body);
    sendSuccess(res, post, 201)
  })

  list = asyncHandler(async (req, res) => {
    const post = await ListPosts.execute();
    sendSuccess(res, post, 200)

  })

  getById = asyncHandler(async (req, res) => {
    const post = await GetPost.execute(req.params.id);
    sendSuccess(res, post, 200)
  })

};
export default new PostController()