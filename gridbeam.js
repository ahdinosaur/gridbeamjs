if (Meteor.isClient) {
  OpenJsCad.AlertUserOfUncaughtExceptions();
  var gProcessor = null;

  var updateSolid = function() {
    gProcessor.setJsCad(document.getElementById('code').value);
  }

  Template.viewer.rendered = function() {
    if (!this._rendered) {
      gProcessor = new OpenJsCad.Processor(document.getElementById("viewer"));
      updateSolid();
    }
  }
  Template.viewer.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
