newProject = function () {
  var userId = Meteor.userId(),
      newId;
  if (userId) {
    newId = Projects.insert({
      title: defaultProjectTitle,
      author: userId(),
      public: false
    });
  } else {
    newId = Projects.insert({
      title: defaultProjectTitle,
      public: true
    });
    var creations = Session.get('creations') || [];
    creations.push(newId);
    Session.set('creations', creations);
  }
  Router.go('/create/' + newId);
}

NewProjectController = RouteController.extend({
  run: newProject
});

Template.createNewButton.events = {
  'click button': newProject
};

Handlebars.registerHelper('eachCreation', function (options) {
  var userId = Meteor.userId(),
      creations;
  if (userId) {
    creations = Projects.find({ author: userId }).fetch();
  } else {
    creations = Session.get('creations');
  }
  return creations.map(function (creation) {
    return options.fn(creation);
  }).join('\n');
});
