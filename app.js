const express = require('express');
const app = express();

const Controller = require('./lib/controller-ds')
const routes = require('./routes/route');

app.use(express.json());

app.use('/', routes)

app.listen(3000, async () => {
  await Controller.init();
  console.info('back scratch has started on port 3000')
});