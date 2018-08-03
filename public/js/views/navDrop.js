'use strict'

var App = App || {};

App.navDrop = App.Editor.extend({

  dropGraph: '',
  dropPaper: '',

  el: '.divDrop',

  template: _.template($('script[name="navDrop"]').html()),

  events: {
      'click .addAttribute':     'addAttribute',
      'click .Chiudi':           'chiudi',
      'click .saveAttr':         'saveAttr',
  },

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
    this.dropPaper.on('element:pointerdblclick', function(elementView, evt, x, y) {
        const typeE = elementView.model.attr('label/text');
        if(typeE == 'Entity'){
          $('#entityDialog').removeClass( "modalNone" ).addClass( "modalView" );
          let entityName = elementView.model.attr('text/text');
          $('.nomeEnt').text(entityName);
          view.trigger('addAttribute', entityName);
        }
    });

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

  saveAttr: function() {
///////////////////////
    alert("TODO");
//////////////////////
    $('li').remove();
    $('#entityDialog').removeClass( "modalView" ).addClass( "modalNone" );
  },

  chiudi: function() {
    $('li').remove();
    $('#entityDialog').removeClass( "modalView" ).addClass( "modalNone" );
  },

  addAttribute: function() {
    $("#entityList").append('<li class="w3-bar"><span onclick="this.parentElement.remove()" class="w3-bar-item w3-button w3-white w3-xlarge w3-right">×</span><div class="w3-bar-item"><span class="w3-large">Scope:</span><select><option value="package">private</option><option value="class">protected</option><option value="opel">public</option></select></div><div class="w3-bar-item"><span class="w3-large">Type:</span><select><option value="string">string</option><option value="int">int</option><option value="double">double</option><option value="data">data</option><option value="bool">bool</option></select></div><div class="w3-bar-item"><span class="w3-large">Nome:</span><input type="text" placeholder="my_var" maxlength="15" required></div><div class="w3-bar-item"><input type="checkbox" value=""><span class="w3-large">Primary Key</span></div></li>');
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
