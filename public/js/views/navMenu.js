'use strict'

var App = App || {};

App.navMenu = App.Editor.extend({

  projectName: '',

  el: '.divMenu',

  template: _.template($('script[name="navMenu"]').html()),

  events: {
      'click #esporta':     'esporta',
      'click .scaricaJ':    'downloadJ',
      'click .scaricaZ':    'downloadZ',
      'click .Annulla':     'annulla',
      'click #deleteAll':   'deleteAll',
      'click #delete':      'delete',
      'click #modifica':    'modifica',
  },

  initialize: function(name) {
    this.projectName = name;
    this.render();
  },

  render: function() {
    this.$el.html(this.template({'project_name': this.projectName}));
    return this;
  },

// BUTTON //
  esporta: function() {
    console.log('Download!');
    let name = this.projectName;
    $('input[name="projectN"]').val(name);
    $('#esportaDialog').removeClass( "modalNone" ).addClass( "modalView" );
  },

  downloadJ: function() {
    let name = $('input[name="projectN"]').val();
    if(name.length <=0 || name.length > 16)
      name = "Diagramma";
    this.trigger('esporta', name);
    $('#esportaDialog').removeClass( "modalView" ).addClass( "modalNone" );
  },

  downloadZ: function() {
    let name = this.projectName;
    //this.trigger('esporta', name);
    alert("TODO!");
    $('#esportaDialog').removeClass( "modalView" ).addClass( "modalNone" );
  },

  annulla: function() {
    $('#esportaDialog').removeClass( "modalView" ).addClass( "modalNone" );
  },

  deleteAll: function() {
    this.trigger('deleteAll');
  },

  delete: function() {
    this.trigger('delete');
  },

  modifica: function() {
    this.trigger('modifica');
  },

});
