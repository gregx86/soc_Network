define([
    'models/user',
    'text!templates/user.html'
], function(User, userTemplate){
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(userTemplate),

        events: {
            'click .removeBtn': 'remove',
            'click .editBtn': 'editUser'
        },

        initialize: function(optins){
            this.render(optins);
        },

        editUser: function(e) {
            var targetEl = $(e.target);
            var tr = targetEl.closest('tr');
            var id = tr.attr('id');
            var user = new User({_id : id});

            user.fetch({
                success: function(model){
                    var url = model.urlRoot() + '/' + model.id;
                    model = model.toJSON();
                    Backbone.history.navigate(url, {trigger: true});
                },
                error: function() {
                    alert('error');
                }
            });
        },

        remove: function(e){
            var targetEl = $(e.target);
            var tr = targetEl.closest('tr');
            var id = tr.attr('id');
            var user = new User({ _id: id});
            console.log(user);

            user.destroy({
                success: function(){
                    tr.remove();
                },
                error: function(){
                    alert('error!');
                }
            });
            return;
        },

        render: function(optins){
            var collection = optins.collection.toJSON();

            this.$el.html(this.template({users: collection}));

            return this;
        }


    });

    return View;
});