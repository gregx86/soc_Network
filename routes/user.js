
module.exports = function(){
    var express = require('express');
    var _UserHandler = require('../handlers/user');
//    var PostHandler = require('../handlers/post');
    var userRouter = express.Router();
    var userHandler = new _UserHandler();
 //   var postHandler = new PostHandler();

    userRouter.post('/', userHandler.create);
    userRouter.get('/', userHandler.getAll);
    userRouter.get('/:userId', userHandler.getById);
    userRouter.put('/:userId',userHandler.updateUser);
    userRouter.delete('/:userId',userHandler.deleteUser);
/*
    userRouter.get('/:userId/posts', postHandler.showPosts);
    userRouter.post('/:userId/posts',postHandler.createPost);
    userRouter.put('/:userId/posts/:postId',postHandler.updatePost);
    userRouter.delete('/:userId/posts/:postId', postHandler.deletePost);
*/
    return userRouter;
};
