Router.configure({
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  layout: 'browser',
  renderTemplates: {
    'browserNavbar': { to: 'navbar'}
  }
})

Router.map(function () {
  this.route('home', {
    path: '/'
  });
  this.route('edit', {
    path: '/edit',///:id',
    //data: function () { return Projects.findOne(this.params._id); },
    layout: 'editor',
    renderTemplates: {
      'editorNavbar': { to: 'navbar' }
    }
  });
});