import { model, Schema } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
const PostModel = model("post", PostSchema);
export default PostModel
