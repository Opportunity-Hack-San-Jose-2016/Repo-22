var app = require('./app');

// Start the server
port = process.env.PORT || 3000;
app.set('port', port );
 
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + port);
});

module.exports = app;