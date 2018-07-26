'use strict'

var App = App || {};

App.Editor = Backbone.View.extend({

  el: '.container',

  initialize: function(name) {
    this.$el.html('');

    this.$el.append('<div class="divMenu"></div>');
    $(".divMenu").after('<div class="canvas"></div>');
    $(".canvas").append('<div class="divDrag"></div>');
    $(".divDrag").after('<div class="divDrop"></div>');

    this.menu = new App.navMenu(name);
    this.drag = new App.navDrag();
    this.drop = new App.navDrop();

  // DRAG event //
    this.listenTo(this.drag, 'drawElement', this.draw);

  // DROP event //


  // MENU event //
    this.listenTo(this.menu, 'esporta', this.esporta);
    this.listenTo(this.menu, 'deleteAll', this.deleteAll);

    this.render();
  },

  render: function() {
    return this;
  },

  loadGraph: function(graph) {
    //console.log(graph);
    let emptyGraph = this.drop.getGraph();
    emptyGraph.fromJSON(JSON.parse(graph));
  },

// DRAG event //
  draw: function(el) {
    this.drop.getGraph().addCell(el);
  },

/////////////////

// DROP event //

/////////////////
// MENU event //
  esporta: function(name) {
    let download = document.createElement('a');
    download.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.drop.getGraph().toJSON())));
    let nameProject = name + '.json';
    download.setAttribute('download', nameProject);
    download.style.display = 'none';
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
  },

  deleteAll: function() {
    this.drop.getGraph().clear();
  },
/////////////////

});
