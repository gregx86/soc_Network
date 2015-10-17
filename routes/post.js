module.exports = function(){
    var express = require('express');
    var PostHandler = require('../handlers/post');
    var postRouter = express.Router();
    var postHandler = new PostHandler();

    postRouter.get('/', postHandler.showPosts);
    postRouter.post('/',postHandler.createPost);
    postRouter.put('/:postId',postHandler.updatePost);
    postRouter.delete('/:postId', postHandler.deletePost);

    return postRouter;
};
