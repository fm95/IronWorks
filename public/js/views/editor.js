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
    this.listenTo(this.drop, 'addAttribute', this.addAttribute);

  // MENU event //
    this.listenTo(this.menu, 'esportaJSON', this.esportaJSON);
    this.listenTo(this.menu, 'esportaZIP', this.esportaZIP);
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

  addAttribute: function(entityName) {

    //alert("TODO: html-table for entity's fields");

    let el = this.entities.findWhere({name:entityName});

    // da creare in base ai valori degli attributi //
    let value = ['private', 'int', 'counter', 'false'];

    el.addAttribute(value);

    //modifica //
    value = ['private', 'double', 'counter', 'true'];
    el.modifyAttribute('counter', value);
  },

/////////////////
// MENU event //
  esportaJSON: function(name) {
    let download = document.createElement('a');
    download.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.drop.getGraph().toJSON())));
    let nameProject = name + '.json';
    download.setAttribute('download', nameProject);
    download.style.display = 'none';
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
  },

  esportaZIP: function(name) {
/* Creo un form che, una volta salvati i dati (json, entities),
   come action reinderizza alla pagine /esporta, gestita dalla
   funzione router() del file server PresentationTier/Middleware/index.js
   il quale chiama una funzione che richiama i generatori di codice
   e restituisce lo zip finale. */

  // Form per l'esportazione //
    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", '/esporta');
    form.setAttribute("target", '_blank');

  // Collections di entities //
    let entities = JSON.stringify(this.entities);
    let input = document.createElement('input');
    input.type = 'hidden';
    input.name = "data";
    input.value = entities;
    form.appendChild(input);

  // Nome progetto //
    let nome = document.createElement('input');
    nome.type = 'hidden';
    nome.name = 'name';
    nome.value = name;
    form.appendChild(nome);

  // ZIP //
    let data = {
        'name': name,
        'entities': this.entities,
        'graph': this.drop.getGraph()
    };
    let zip = document.createElement('input');
    zip.type = 'hidden';
    zip.name = 'zip';
    zip.value = JSON.stringify(data);
    form.appendChild(zip);

// Form submit //
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  },

  deleteAll: function() {
    this.counter = 0;
    this.entities.reset();
    this.drop.getGraph().clear();
    $('#delete').prop('disabled', true);
    $('#modifica').prop('disabled', true);
    $('#textA').prop('disabled', true);
    $('#textA').val("");
  },
/////////////////

});
