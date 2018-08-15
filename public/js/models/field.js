'use strict'

var App = App || {};

App.Field = Backbone.Model.extend({

  defaults: {
    scope: '',
    array: '',
    type: '',
    name: '',
    // value
    primaryKey: '',
  },

  setScope: function (scope) {
    this.set({scope: scope});
  },

  getScope: function() {
    return this.get('scope');
  },

  setArray: function (array) {
    this.set({array: array});
  },

  getArray: function() {
    return this.get('array');
  },

  setType: function (type) {
    this.set({type: type});
  },

  getType: function() {
    return this.get('type');
  },

  setName: function (name) {
    this.set({name: name});
  },

  getName: function() {
    return this.get('name');
  },

  setPK: function (check) {
    this.set({primaryKey: check});
  },

  getPK: function() {
    return this.get('primaryKey');
  },

  getJSON: function() {
    let json = JSON.stringify(this.toJSON());
    return json;
  },

});
