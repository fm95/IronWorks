'use strict'

var App = App || {};

App.Table = Backbone.View.extend({

  el: '.container',

  template: _.template($('script[name="table"]').html()),

  initialize: function(paper) {
    this.render();
  },

  render: function() {
      this.$el.html(this.template());
      return this.$el;
  },

});
