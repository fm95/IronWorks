'use strict'

var App = App || {};

App.Entity = Backbone.Model.extend({

  defaults: {
    name: '',
  },

  initialize: function() {
    // Collection di campi dati //
    this.set('attr', new App.Fields());
  },

  parse: function(response) {
  /* permette di ottenere il JSON anche della collection attr */
      debugger;
      if (_.has(response, "attr")) {
          let aux = new new App.Fields(response.attr);
          this.set('attr', aux);
          delete response.attr;
      }
      return response;
  },

  setName: function (name) {
    this.set({name: name});
  },

  getName: function() {
    return this.get('name');
  },

  getAttribute: function(attributeName) {
    return this.attr.findWhere({name: attributeName});
  },

  modifyAttribute: function(fieldName, value) {
    let attr = this.get('attr');
    let field = attr.findWhere({name:fieldName});
    field.setScope(value[0]);
    field.setType(value[1]);
    field.setName(value[2]);
    field.setPK(value[3]);
  },

  addAttribute: function(value) {
    let attr = this.get('attr');

    let field = new App.Field();
    field.setScope(value[0]);
    field.setType(value[1]);
    field.setName(value[2]);
    field.setPK(value[3]);

    attr.add(field);
  },

  removeAttribute: function (attribute) {
    this.attr.remove(attribute);
  },

  getAttributes: function () {
    return this.attr;
  },

  getJSON: function() {
    var json = JSON.stringify(this);
    console.log(json);
  },

});
