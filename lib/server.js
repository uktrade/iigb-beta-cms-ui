var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.set('case sensitive routing', false);

app.use(express.static(process.cwd() + '/dist'));

app.listen(port, function() {
  console.log('listening');
});
