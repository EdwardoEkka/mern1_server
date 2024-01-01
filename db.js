const { MongoClient } = require('mongodb');

let dbConnection;
let uri= "mongodb+srv://vishalekka18:Edward123@cluster0.ezcpyyy.mongodb.net/dummy?retryWrites=true&w=majority";
// let uri="mongodb://127.0.0.1:27017/dummy";

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db();
        return cb(null); // Pass null when there's no error
      })
      .catch((err) => {
        console.error(err); // Log the error
        return cb(err); // Pass the error to the callback
      });
  },
  getDb: () => dbConnection,
};
