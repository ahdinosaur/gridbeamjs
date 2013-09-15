Projects = new Meteor.Collection('projects');

defaultProjectTitle = "Untitled Project";

if (Meteor.isServer) {
  Meteor.publish('projects', function () {
    return Projects.find({
      $or: [
        { public: true },
        { author: Meteor.userId() }
      ]
    });
  });
}

