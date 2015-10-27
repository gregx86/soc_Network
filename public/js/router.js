define([
    'views/index',
    'views/register',
    'views/login',
    'models/user',
    'collections/users',
    'views/user',
    'views/edit',
    'collections/posts',
    'views/post'
], function(IndexView, RegisterView, LoginView, User, UserCollection, UserView, EditView, PostCollection, PostView ){
    var Router = Backbone.Router.extend({
        currentView: null,

        routes: {
            "index": "index",
            "login": "login",
            "register": "register",
            "users(/:userId)": "users",
            "posts": "posts",
            "*any": "any"
        },

        changeView: function(view) {
            if ( null != this.currentView ){
                this.currentView.undelegateEvents();
            }
            this.currentView = view;
            this.currentView.render();
        },

        index: function () {
            this.changeView(new IndexView());
        },

        login: function() {
            this.changeView(new LoginView());
        },

        register: function() {
            this.changeView(new RegisterView());
        },

        users: function(userId){
            var self = this;
            var collection;
            var renderView;
            var user;

            if(!userId) {
                collection = new UserCollection();

                renderView = function() {
                    if(self.userView){
                        self.userView.undelegateEvents();
                    }

                    self.userView = new UserView ({
                        collection: collection
                    });
                    return self;
                };

                collection.fetch({reset: true});
                collection.bind('reset', renderView, this);
            } else {
                user = new User({_id: userId});
                user.fetch({
                    success: function(model, response) {
                        self.userView = new EditView(model.toJSON());
                    },
                    error: function(model, response){
                        alert(response.text);
                    }
                });
            }
        },

        posts: function(){

            var collection = new PostCollection();
            var renderView = function() {
                var view = new PostView({
                    collection: collection
                });
            };

            collection.fetch({reset: true});
            collection.bind('reset', renderView);
        },

        any: function () {
            alert('404');
        }
    });
    return Router;
});