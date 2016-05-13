const MongoClient = require('mongodb').MongoClient;
const state = {
  db: null,
};

const connect = (url, callback) => {
  if (state.db) {
    callback();
  } else {
    MongoClient.connect(url, (err, db) => {
      if (err) {
        callback(err, null);
      } else {
        state.db = db;
        callback(null, db);
      }
    });
  }
};

const connection = () => state.db;

const close = callback => {
  if (state.db) {
    state.db.close(err => {
      state.db = null;
      state.mode = null;
      if (err) {
        callback(false);
        throw err;
      } else {
        callback(true);
      }
    });
  }
};

module.exports = {
  connect,
  connection,
  close,
};
