'use strict'

var App = App || {};

App.Entity = Backbone.Model.extend({

  initialize: function() {
    if (!this.has('attr'))
      this.set('attr', new App.Field());

  },

  getName: function() {
    return this.get('name');
  },

  setName: function(name) {
    this.set({name: name});
  },

  getAttribute: function(attributeName){
      return this.attr.where({name: attributeName});
  },

  addAttribute: function (attribute) {
      let attributesTemp = this.get('attr');
      attributesTemp.add(attribute);
  },

  removeAttribute: function (attribute) {
      this.attr.remove(attribute);
  },

  getAttributes: function () {
      return this.attr;
  },

  getJSON: function() {
    var json = _.clone(this.attributes);
    json.attr = this.get('attr').toJSON();
    return json;
  },

});
