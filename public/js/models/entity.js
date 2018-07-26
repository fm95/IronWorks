'use strict'

var App = App || {};

App.Entity = Backbone.Model.extend({

  initialize: function() {
    this.set('attr', new App.Field());
  },

  getJSON: function() {
    var json = _.clone(this.attributes);
    json.attr = this.get('attr').toJSON();
    return json;
  },

  clear: function() {
      this.destroy();
  },


});
