define(['models/post'], function(Model){
    var Collection = Backbone.Collection.extend({
        model: Model,
        url: 'user/:id/posts/'
    });
    return Collection;
});