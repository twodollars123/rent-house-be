const { Client } = require("pg");

const dbConfig = require("../configs/postgre.config");

const client = new Client(dbConfig);

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "postgre") {
    client
      .connect()
      .then(() => {
        console.log("Connected to PostgreSQL database");
      })
      .catch((err) => {
        console.error("Error connecting to PostgreSQL database", err);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
