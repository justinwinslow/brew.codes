/*
  APP CONFIG & INIT
*/

// Set debug mode [think about modifying this to be dynamic]
window.debug = true;

if (debug) console.log('init');

// Require config
require.config({
  paths: {
    // Libraries
    jquery: '../bower_components/jquery/dist/jquery',
    //underscore: '../bower_components/underscore', I left this as a comment so you can see how aliasing paths can make "upgrades" easier
    underscore: '../bower_components/lodash/dist/lodash',
    ember: '../bower_components/ember/ember',
    handlebars: '../bower_components/handlebars/handlebars',
    modernizr: '../bower_components/modernizr/modernizr',
    text: '../bower_components/text/text',
    css: '../bower_components/css/css',
    // Modules
    somemodule: 'modules/module'
  },
  shim: {
    ember: {
      deps: ['jquery', 'handlebars'],
      exports: 'Ember'
    },
    underscore: {
      exports: '_'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    modernizr: {
      exports: 'Modernizr'
    }
  }
});

// Start app
require(
  [
    'jquery',
    'underscore',
    'ember',
    'handlebars'
  ],
  function ($, _, Ember, Handlebars) {
    if (debug) console.log($);
    if (debug) console.log(_);
    if (debug) console.log(Ember);
    if (debug) console.log(Handlebars);

    var app = Ember.Application.create();

    app.Router.map(function() {
        this.route("index", { path: "/" });
    });

    app.IndexRoute = Ember.Route.extend({
        setupController: function(controller, model) {
            controller.set('content', {name: "Justin"});
        }
    });
  }
);
