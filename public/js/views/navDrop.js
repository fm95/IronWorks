'use strict'

var App = App || {};

App.navDrop = App.Editor.extend({

  dropGraph: '',
  dropPaper: '',

  el: '.divDrop',

  template: _.template($('script[name="navDrop"]').html()),

  initialize: function() {
    this.render();
    this.buildGraph();
    this.selected = null;
  },

  render: function() {
      this.$el.html(this.template());
      return this.$el;
  },

  getGraph: function() {
    return this.dropGraph;
  },

  buildGraph: function() {
    var view = this;

    this.dropGraph = new joint.dia.Graph;
    this.dropPaper = new joint.dia.Paper({
      el: $('#paper'),
      model: this.dropGraph,
      width: 1024,
      height: 574,
      snapLinks: true,
      linkPinning: false,
      drawGrid: true,
      gridSize: 10,
      backgroundColor: 'white',
      interactive: true,
      defaultLink: this.styleLink(),
      linkConnectionPoint: joint.util.shapePerimeterConnectionPoint,
      highlighting: {
        'default': {
            name: 'stroke',
            options: {
                padding: 20,
            }
      }},
      validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
        if (magnetS && magnetS.getAttribute('type') === 'input')
              return false;
          // Prevent linking from output ports to input ports within one element.
          if (cellViewS === cellViewT)
              return false;

          const typeS = cellViewS.model.attr('label/text');
          const typeT = cellViewT.model.attr('label/text');
          if((typeS == 'Actor' && typeT == 'Boundary') || // Attore -> Interfaccia
              (typeS == 'Boundary' && typeT == 'Controller') || // Interfaccia -> Controller
                (typeS == 'Controller' && typeT == 'Controller') || // Controller -> Controller
                  (typeS == 'Controller' && typeT == 'Entity') || // Controller -> Entity
                    (typeS == 'Entity' && typeT == 'Controller')) // Entità -> Controller
                      return (magnetS !== magnetT);
          else // altrimenti connessione non valida
            return false;
      },

    });

    // Selezione elementi grafico //
    var previousCellView = null;
    var select = null;

    this.dropPaper.on('cell:pointerdown', function(cellView) {
      select = cellView.model;
      $('#delete').prop('disabled', false);
      $('#modifica').prop('disabled', false);
      $('#textA').prop('disabled', false);
    });
    this.dropPaper.on('element:pointerdown', function(cellView, evt, x, y) {
        select = cellView.model;
        cellView.highlight();
        if(cellView != previousCellView && previousCellView != null){
            previousCellView.unhighlight();}
        previousCellView = cellView;

        $('#delete').prop('disabled', false);
        $('#modifica').prop('disabled', false);
        $('#textA').prop('disabled', false);
      }
    );
    this.dropPaper.on('blank:pointerdown', function(evt, x, y) {
        select = null;
        $('#delete').prop('disabled', true);
        $('#modifica').prop('disabled', true);
        $('#textA').prop('disabled', true);
        $('#textA').val("");
          if(previousCellView != null){
              previousCellView.unhighlight();
          }
      }
    );
/*
    this.dropPaper.on('element:pointerdblclick', function(elementView, evt, x, y) {
        const typeE = elementView.model.attr('label/text');
        if(typeE == 'Entity'){

        TABELLA POP-UP (stile log-in)
          alert("TODO: Entity_editor");

        }
    });
*/

    $('#delete').on('click', function() {
      if (select){
        const type = select.attr('label/text');
        if(type == 'Entity'){
          const name = select.attr('text/text');
          view.trigger('deleteE', name);
        }    
        select.remove();
      }
    });

    $('#modifica').on('click', function() {
      if (select) {
        let newN = $('#textA').val();
        if(newN.length > 0){

          if(select.isLink()) {
            select.appendLabel({
                  attrs: {text: {text: newN}},
                  position: {distance: 0.50}
                });
          }
          else {
              const type = select.attr('label/text');
              if(type == 'Entity'){
                view.trigger('changeName', select, newN);
              }else{
                select.attr('text/text', newN);
              }
          }

        }
        $('#textA').val("");
      }
    });

  },

  styleLink: function() {
    var link = new joint.dia.Link({
      attrs: {
          '.connection': { stroke: 'black', strokeWidth: '1' },
          '.marker-target': {
              stroke: 'black',
              strokeWidth: 1,
              fill: 'black',
              d: 'M 10 0 L 0 5 M 0 5 L 10 10 z'
          }
      },
    });
    return link;
  },

});
