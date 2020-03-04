//DON'T FORGET TO ADD SCRIPTS BELOW!
// const path = require("path");
// Update with your config settings.
require("dotenv").config();
console.log(
  ("POSTGRES_DB:",
  process.env.db,
  "POSTGRES_USER:",
  process.env.user,
  "POSTGRES_PASSWORD:",
  process.env.password)
);
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.DATABASE,
      user: process.env.USER,
      password: process.env.PASSWORD,
      port: process.env.DATABASE_PORT
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    pool: {
      min: 2,
      max: 10
    }
  },
  test: {
    client: "postgresql",
    connection: {
      // database: process.env.TEST_DATABASE,
      // user: process.env.USER,
      // password: process.env.PASSWORD,
      host: "localhost",
      database: "databasename-test", //process.env.db,
      user: "dev", //process.env.user,
      password: "dev",
      port: 5432 //process.env.password
      // port: process.env.DATABASE_PORT
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/tset/seeds"
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: process.env.TEST_DATABASE,
      user: process.env.USER,
      password: process.env.PASSWORD,
      port: process.env.DATABASE_PORT
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations"
    }
  }
};
