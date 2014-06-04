var express = require('express'),
	stylus = require('stylus'),
      nib = require('nib'),
	app = express();

var db = {
  atx: {
    locations: [
      {
        name: 'BuzzMill',
        network: 'BuzzMillPublic',
        password: 'theloginn2'
      }
    ]
  }
};

// Custom compile configuration for Stylus
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', false)
    .set('include css', true)
    .define('url', stylus.url({
      limit: 60000
    }))
    .use(nib());
}

app.use(stylus.middleware({
  debug: true,
  src: __dirname + '/public',
  compile: compile
}));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.status(200).sendfile('index.html');
});

app.get('/:statecode', function(){
  res.send(db[req.params.statecode]);
});

app.listen(8000);

console.log('Listening on port 8000');
