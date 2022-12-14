const express = require('express');

const CommentCtrl = require('../controllers/commentController');

const commentRouter = express.Router();

commentRouter.post('/comment', CommentCtrl.createComment);
commentRouter.get('/comments/:discussionId', CommentCtrl.getComments);
commentRouter.delete('/comment/:id', CommentCtrl.deleteComment);

module.exports = commentRouter;
