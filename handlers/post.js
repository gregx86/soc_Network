//Post handlers

var User = require('../models/userModel.js');

var Post = function() {
    this.showPosts = function(req, res) {
        res.json(req.user.posts);

    };

    this.createPost = function(req, res) {
        req.user.posts.push(req.body);

        req.user.save(function(err) {
            if(err){
                res.status(500).send(err);
            } else {
                res.json(req.user);
            }
        });
    };

    // update post
    this.updatePost = function(req, res) {
        var id = req.params.postId;

        for (var i = 0; i < req.user.posts.length; i++) {
            if(id == req.user.posts[i]._id){
                req.user.posts[i].title = req.body.title;
                req.user.posts[i].description = req.body.description;
            } else {
                res.send("No post on this Id");
            }
        }

        req.user.save(function(err) {
            if(err){
                res.status(500).send(err);
            } else {
                res.json(req.user);
            }
        });
    };

    //delete post
    this.deletePost = function(req, res) {
        var id = req.params.postId;
        req.user.posts.id(id).remove();

        /*

         for (var i = 0; i < req.user.posts.length; i++) {
         if(id == req.user.posts[i]._id){
         req.user.posts.splice(i, 1);
         }
         }
         */

        req.user.save(function(err) {
            if(err){
                res.status(500).send(err);
            } else {
                res.json(req.user);
            }
        });
    };
};

module.exports = Post;
