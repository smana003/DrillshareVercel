// const { MongoClient } = require("mongodb");
import { MongoClient } from "mongodb";
const Db = process.env.MONGO_URL;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

module.exports = {
  connectToServer: async function (callback) {

    try {
      await client.connect();
    } catch (e) {
      console.error(e);
    }

    _db = client.db("Drillshare");

    return (_db === undefined ? false : true);
  },
  getDb: function () {
    return _db;
  },
};