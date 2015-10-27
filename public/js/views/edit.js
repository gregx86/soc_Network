define([
    'models/user',
    'text!templates/edit.html'
], function (User, userTemplate) {
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(userTemplate),

        events: {
            'click #saveBtn': 'saveItem'

        },

        initialize: function(model) {
            this.render(model);
        },

        saveItem: function(e) {
            var self = this;
            var thisEl = this.$el;
            var data;
            var firstName = thisEl.find('#firstName').val();
            var lastName = thisEl.find('#lastName').val();
            var email = thisEl.find('#email').val();


            data = {
                firstName: firstName,
                lastName: lastName,
                email: email
            };

            var user = new User(data);

            user.save({}, {
                success: function(model){
                    self.undelegateEvents();
                    Backbone.history.navigate('#users', {trigger: true});
                },
                error: function(response, xhr){
                    alert(response.status);
                }
            });
        },

        render: function() {
            this.$el.html(this.template());

            return this;
        }


    });

    return View;
});

