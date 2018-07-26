'use strict'

// Namespace //
var App = App || {};

$(document).ready(function(){

  let Application = new App.Router();
  Backbone.history.start({pushState: false});

  window.onbeforeunload = () => {
    return "Le modifiche apportate potrebbero non essere salvate.";
  }

});
