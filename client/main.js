Router.configure({
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  layout: 'layout',
  renderTemplates: {
    'container': { to: 'container' },
    'navbar': { to: 'navbar' }
  }
});

Router.map(function () {
  this.route('home', {
    path: '/'
  });
  this.route('new', {
    path: '/new',
    controller: 'NewProjectController'
  });
  this.route('create', {
    path: '/create/:id',
    data: function () { return Projects.findOne({ _id: this.params.id }); },
    renderTemplates: {
      'null': { to: 'container'},
      'createNavbar': { to: 'navbar' }
    }
  });
  this.route('explore', {
    path: '/explore',
    data: function () { return Projects.find({}); },
    renderTemplates: {
      'null': { to: 'container'},
      'exploreNavbar': { to: 'navbar' }
    }
  });
});

Meteor.startup(function () {
  Hooks.init();
  Hooks.onLoggedIn = function () {
    var userId = Meteor.userId();
    if (userId) {
      Session.get('creations').forEach(function (projId) {
        Projects.update({ _id: projId }, { $set: { author: userId } });
      });
      Session.set('creations', null);
    }
  };
});
