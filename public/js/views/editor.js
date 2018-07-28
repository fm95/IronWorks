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

  // Collections //
    this.entities = new App.Entities();
    this.counter = 0;

  // DRAG event //
    this.listenTo(this.drag, 'drawElement', this.draw);

  // DROP event //
    this.listenTo(this.drop, 'changeName', this.change);
    this.listenTo(this.drop, 'deleteE', this.eliminaE);

  // MENU event //
    this.listenTo(this.menu, 'esporta', this.esporta);
    this.listenTo(this.menu, 'deleteAll', this.deleteAll);

    this.render();
  },

  render: function() {
    return this.$el;
  },

  loadGraph: function(graph) {
    //console.log(graph);
    let emptyGraph = this.drop.getGraph();
    emptyGraph.fromJSON(JSON.parse(graph));
  },

// DRAG event //
  draw: function(el) {
    const type = el.attr('label/text');

    if(type === 'Entity') {
        let name = 'Entity_' + this.counter;
        this.counter++;
        el.attr('text/text', name);
        this.entities.add(new App.Entity({name:name}));
    }

    this.drop.getGraph().addCell(el);
  },
/////////////////
// DROP event //
  change: function(select, newN) {
    let old = select.attr('text/text');
    let el = this.entities.findWhere({name:newN});
    if(el){
        alert("ERRORE!\nEsiste già una entità con questo nome");
        select.attr('text/text', old);
    }else{
        let el = this.entities.findWhere({name:old});
        el.setName(newN);
        select.attr('text/text', newN);
    }
  },

  eliminaE: function(arg) {
    this.entities.findWhere({name:arg}).destroy();
  },

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
    this.counter = 0;
    this.entities.reset();
    this.drop.getGraph().clear();
  },
/////////////////

});
