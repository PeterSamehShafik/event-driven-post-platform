import NotFoundError from '../../domain/errors/NotFoundError.js';

const notFoundHandler = (req, res, next) => {
  next(new NotFoundError(`Route ${req.method} ${req.path}`));
};

export default notFoundHandler;