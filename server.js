var 	express		= require('express'),
        router          = express.Router(),
    	app			= express(),
    	port        = process.env.PORT || 3000;
var helmet = require('helmet');
var ipfilter = require('./security/ipfilter.js');
var ipFilterOn = process.env.IIGB_IP_FILTER;


//security headers
app.use(helmet());

// SETUP IP FILTERING
// =============================================================================
if (ipFilterOn === 'true') {
  app.use(ipfilter.filter);
  console.log('Ip filter is on');
}

//some basic redirect routes
app.get('/', function(req, res) {
  res.redirect('prose/');
});

app.set('case sensitive routing', false);

app.use('/example', express.static(__dirname + '/example'));
app.use('/prose', express.static(__dirname + '/prose'));

app.listen(port, function() {
    console.log('listening');
});
