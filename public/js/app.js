define(['router'], function(Router){
   var init = function(){
        var router = new Router();
        checkLogin(runApplication);

         /*var fragment = Backbone.history.fragment;
        var url = window.location.hash;

        Backbone.history.start({silent: true});

        if (fragment){
            Backbone.history.fragment = '';
        } else {
            Backbone.history.fragment = '';
            Backbone.history.navigate(url, {trigger: true});
        }
        */
    };

   var checkLogin = function(callback) {
        $.ajax("/account/authenticated", {
            method: "GET",
            success: function() {
                return callback(true);
            },
            error: function(data) {
                return callback(false);
            }
        });
    };

    var runApplication = function(authenticated) {
        if (!authenticated) {
            window.location.hash = 'login';
        } else {
            window.location.hash = 'users';
        }
        Backbone.history.start();
    };

    return {
        init: init
    }
});