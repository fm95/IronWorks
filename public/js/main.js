'use strict'

// Namespace //
var App = App || {};

$(document).ready(function(){

  let Application = new App.Router();
  Backbone.history.start({pushState: false});

  function myConfirmation() {
    return 'Le modifiche non salvate andranno perse. Sei sicuro di uscire?';
  }
  window.onbeforeunload = myConfirmation;

});
