import ValidationError from "../errors/ValidationError.js"

class Post {
  constructor({ title, content }) {
    this.validate({ title, content });
    this.title = title;
    this.content = content;
  }

  validate({ title, content }) {
    if (!title) throw new ValidationError('Title is required');
    if (!content) throw new ValidationError('Content is required');
  }
}

export default Post;
