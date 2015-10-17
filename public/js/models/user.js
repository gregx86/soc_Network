define([], function(){
    var Model = Backbone.Model.extend({
        idAttribute: '_id',

        urlRoot: function(){
            return '/users';
        },
        parse: function(response){
            response.fullName = response.name.first + ' ' + response.name.last;

            return response;
        }
    });

    return Model;
    //return 'Hello';
});