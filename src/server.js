const mongoose = require('mongoose');
const app = require('./lib/Express');

const dbConfig = require('../config/database.config');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url).then(() => {
  console.log("Sucsess connected database");
}).catch(err =>{
  console.log(err);
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});

if (!module.parent) {
  app.listen(3000, onStarted);
  app.on('error', onError);
  app.on('listening', onListening);
} 

function onStarted() {
  console.info(`Server started on port 3000`);
}

function onError(e) {
  console.error(`ERROR: ${e}`);
}

function onListening() {
  console.info(`Server is listening on port`);
}
