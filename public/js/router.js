define([
    'views/register',
    'views/login',
    'collections/users',
    'views/user'
], function(RegisterView, LoginView, UserCollection, UserView ){
    var Router = Backbone.Router.extend({
        currentView: null,

        routes: {
            "login": "login",
            "register": "register",
            "users": "users",
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

        login: function() {
            this.changeView(new LoginView());
        },

        register: function() {
            this.changeView(new RegisterView());
        },

        users: function(){
            var collection = new UserCollection();
            var renderView = function() {
                var view = new UserView({
                    collection: collection
                });
            };
            collection.fetch({reset: true});
            collection.bind('reset', renderView);
        },

        posts: function(){
            alert('Posts');
        },

        any: function () {
            alert('404');
        }
    });
    return Router;
});