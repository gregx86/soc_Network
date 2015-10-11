define([
    'collections/users',
    'views/user'
], function(UserCollection, UserView){
    var Router = Backbone.Router.extend({
        routes: {
            "users": "users",
            "posts": "posts",
            "*any": "any"
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