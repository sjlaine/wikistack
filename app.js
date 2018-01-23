const http = require('http');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const nunjucks = require('nunjucks');
const models = require('./models');
const routes = require('./routes/index.js');

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/public'))); //public folder
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);
app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/user'));

nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).send(err.message);
})

models.db.sync({force: false})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);
