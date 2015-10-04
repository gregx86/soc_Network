//Post handlers
var mongoose = require('mongoose');

var User = mongoose.model('User');
var Post = mongoose.model('Post');

var PostHandler = function() {
    this.showPosts = function(req, res, next) {
       // res.json(req.user.posts);
        var id = req.params.userId;
        console.log(id);

        Post.find({createdBy: id })
            .populate('createdBy')
            .exec(function (err, response){
                if (err){
                    return next(err);
                }
                res.status(200).send(response);
            });

    };

    this.createPost = function(req, res, next) {
        //var post = new Post(req.body);
        var post = new Post({
            title: req.body.title,
            description: req.body.description,
            createdBy: req.params.userId
        });

        post.save(function (err, post) {
                if (err) {
                    return next(err);
                }
                res.status(200).send(post);
            });
     };

    // update post
    this.updatePost = function(req, res, next) {
        var id = req.params.postId;

        Post.findById(id, function(err, post){
            post.title = req.body.title || post.title ;
            post.description = req.body.description || post.description;
            post.save(function(err) {
            if(err){
                return next(err);
            } else {
                res.status(200).send(post);
            }
        });
        });
    };

    //delete post
    this.deletePost = function(req, res, next) {
        var id = req.params.postId;
        Post.findByIdAndRemove(id, function(err, post){
            if(err){
                return next(err);
            } else {
                res.status(204).send(post);
            }
        });
    };
};

module.exports = PostHandler;
