// jQuery Essentails
function htmlEncode(value){
    return $('<div/>').text(value).html();
}
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
    options.url = 'https://backboneserver.herokuapp.com/' + options.url;
});

// Backbone Collection
var Users = Backbone.Collection.extend({
    url: '/users'
});

// Backbone Model
var User = Backbone.Model.extend({
    urlRoot: '/users'
});

// Backbone Views
var UserListView = Backbone.View.extend({
    el: '.page',
    render: function () {
        var that = this;
        var users = new Users();
        users.fetch({
            success: function (users) {
                var template = _.template($('#user-list-template').html())( {users: users.models});
                that.$el.html(template);
            }
        })
    }
});

var userListView = new UserListView();                              // new list user instance

var UserEditView = Backbone.View.extend({
    el: '.page',
    events: {
        'submit .edit-user-form': 'saveUser',
        'click .delete': 'deleteUser'
    },
    saveUser: function (ev) {
        var userDetails = $(ev.currentTarget).serializeObject();
        var user = new User();
        user.save(userDetails, {
            success: function (user) {
                router.navigate('', {trigger:true});
            }
        });
        return false;
    },
    deleteUser: function (ev) {
        this.user.destroy({
            success: function () {
                console.log('destroyed');
                router.navigate('', {trigger:true});
            }
        });
        return false;
    },
    render: function (options) {
        var that = this;
        if(options.id) {
            that.user = new User({id: options.id});
            that.user.fetch({
                success: function (user) {
                    var template = _.template($('#edit-user-template').html())({user: user});
                    that.$el.html(template);
                }
            })
        } else {
            var template = _.template($('#edit-user-template').html())({user: null});
            that.$el.html(template);
        }
    }
});
var userEditView = new UserEditView();              // new Edit view instance

// Backbone Router
var Router = Backbone.Router.extend({
    routes: {
        ""          : "home",
        "edit/:id"  : "edit",
        "new"       : "edit"
    }
});

var router = new Router;                           // new Router instance

router.on('route:home', function() {
    // render user list
    userListView.render();
})

router.on('route:edit', function(id) {
    userEditView.render({id: id});
})

// So we can use browser control to move back and forth
Backbone.history.start();