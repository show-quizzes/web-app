'use strict';

import express    from 'express';
import morgan     from 'morgan';
import bodyParser from 'body-parser';
import path       from 'path';
import nunjucks   from 'nunjucks';

import client     from './routes/client';

const publicPath = path.resolve(__dirname, '../public');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(publicPath));

nunjucks.configure(path.resolve(__dirname, 'views'), {
  autoescape: false,
  express : app,
  watch: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/_health', (req, res) => {
  res.json({
    ok: true,
    message: 'healthy'
  });
});

app.use('/', client);

app.listen(port);
console.log(`I'm at http://localhost:${port}`);
