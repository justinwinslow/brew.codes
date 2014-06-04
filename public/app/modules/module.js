/*
  BASIC MODULE DEFINITION
*/

define([
  'jquery',
  'underscore',
  'backbone',
  'modernizr',
  'css!../styles/module.css'
],
function($, _, Backbone, Modernizr, css, submodule) {
  if (debug) console.log('css: ', css);
  // Create object to store the entire module
  var module = {};

  // Define module's model
  module.model = Backbone.Model.extend({
    initialize: function(options){
      this.options = _.extend(this.options, options);
      this.events();
    },
    events: function(){
      this.on('event', function(data){
        console.log('An event on model', data);
      });
    },
    destroy: function(){
      this.off();
    },
    options: {}
  });

  // Create an object for desparate views
  module.view = {};

  if(Modernizr.canvas){
    // Define module's primary view
    module.view.main = Backbone.View.extend({
      initialize: function(options){
        if (debug) console.log(options);

        this.model = new module.model(options);

        this.options = _.extend(this.options, options);

        if (debug) console.log(this.options.name);

        this.render();
      },
      render: function(){
        if (debug) console.log('render');

        this.$el = $('<div class="module" />');

        $('body').append(this.$el);

        this.$el.append('<p>' + this.options.name + ' w/ canvas</p>');

        this.$el.append('<canvas id="myCanvas" width="300" height="300"/>');

        var myCanvas = document.getElementById('myCanvas'),
          canvasContext = myCanvas.getContext('2d');

        canvasContext.fillStyle = '#f00';
        canvasContext.fillRect(0, 0, 150, 150);
      },
      events: function(){
        if (debug) console.log('events');
        var self = this;

        this.on('myEvent', function(data){
          if (debug) console.log('An event on view 0', data);
        });

        this.$el.on('click', function(event){
          if (debug) console.log(self.$el.text() + ' 0');
        });
      },
      destroy: function(){
        this.off();
        this.$el.off();
        this.model.destroy();
      },
      options: {
        name: 'Default title'
      }
    });

  }else{
    // Define module's primary view canvas fallback
    module.view.main = Backbone.View.extend({
      initialize: function(options){
        if (debug) console.log(options);

        this.model = new module.model(options);

        this.options = _.extend(this.options, options);

        if (debug) console.log(this.options.name);

        this.render();
      },
      render: function(){
        if (debug) console.log('render');

        this.$el = $('<div class="module" />');

        $('body').append(this.$el);

        this.$el.append('<p>' + this.options.name + ' w/o canvas</p>');

        require(['excanvas'], function(){
          this.$el.append('<canvas id="myCanvas" width="300" height="300"/>');

          var myCanvas = document.getElementById('myCanvas');

          G_vmlCanvasManager.initElement(myCanvas);

          var canvasContext = myCanvas.getContext('2d');

          canvasContext.fillStyle = '#f00';
          canvasContext.fillRect(0, 0, 150, 150);
        });
      },
      events: function(){
        if (debug) console.log('events');
        var self = this;

        this.on('myEvent', function(data){
          console.log('An event on view 1', data);
        });

        this.$el.on('click', function(event){
          console.log(self.$el.text() + ' 1');
        });
      },
      destroy: function(){
        this.off();
        this.$el.off();
        this.model.destroy();
      },
      options: {
        name: 'Default title'
      }
    });

  }

  return module;
});