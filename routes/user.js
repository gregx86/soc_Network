var express = require('express');

var routes = function(User){
    var UserHandler = require('../handlers/user');
    var PostHandler = require('../handlers/post');
    var userRouter = express.Router();
    var userHandler = new UserHandler();
    var postHandler = new PostHandler();

    userRouter.use('/:userId', function(req, res, next) {
        User.findById(req.params.userId, function (err, user){
            if(err) {
                res.status(500).send(err);
            } else if(user) {
                req.user = user;
                next();
            } else {
                res.status(404).send('User not found');
            }

        });
    });

    userRouter.post('/', userHandler.create);
    userRouter.get('/', userHandler.getAll);
    userRouter.get('/:userId', userHandler.getById);
    userRouter.put('/:userId',userHandler.updateUser);
    userRouter.patch('/:userId',userHandler.updateParam);
    userRouter.delete('/:userId',userHandler.deleteUser);

    userRouter.get('/:userId/posts', postHandler.showPosts);
    userRouter.post('/:userId/posts',postHandler.createPost);
    userRouter.put('/:userId/posts/:postId',postHandler.updatePost);
    userRouter.delete('/:userId/posts/:postId', postHandler.deletePost);

    return userRouter;
};

module.exports = routes;