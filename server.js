var express = require('express'),
	stylus = require('stylus'),
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

app.use(stylus.middleware({
  debug: true,
  src: __dirname
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
