'use strict'

var App = App || {};

App.Field = Backbone.Model.extend({
  defaults: {
    name: '',
    type: '',
    length: '',
  },

  setName: function (name) {
      this.set({name: name});
  },

  getName: function() {
    return this.get('name');
  },

  setLength: function(length){
      this.set({length: length});
  },

  getLength: function () {
      return this.get('length');
  },

  setType: function (type) {
      this.set({type: type});
  },

  getType: function () {
      return this.get('type');
  },


});
