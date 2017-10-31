var express = require('express');

var app = express();

var path = require('path');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'public', 'dist')));

require('./server/config/routes.js')(app);

app.all("*", (req,res,next) => {
    res.sendfile(path.resolve("./public/dist/index.html"))
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});