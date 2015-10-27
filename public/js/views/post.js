define([
    'models/post',
    'text!templates/post.html'
], function(Post, postTemplate){
    var View = Backbone.View.extend({
        el: '#posts',
        template: _.template(postTemplate),

        events: {
        },

        initialize: function(optins){
            this.render(optins);
        },


        render: function(optins){
            var collection = optins.collection.toJSON();

            this.$el.html(this.template({posts: collection}));

            return this;
        }


    });

    return View;
});