//DON'T FORGET TO ADD SCRIPTS BELOW!

// Update with your config settings.
require( "dotenv" ).config();
module.exports = {
  development: {
    
    client: "postgresql", connection: {
      database: process.env.DATABASE,
      user: process.env.USER,
      password: process.env.PASSWORD,
      port: process.env.DATABASE_PORT,
    }, migrations: {
      directory: "./data/migrations",
    }, seeds: {
      directory: "./data/seeds",
    }, pool: {
      min: 2, max: 10,
    },
  }, test: {
    client: "postgresql", connection: {
      
      database: "synaps-test",
      user: "postgres",
      password: "password",
      port: 5432,
    }, migrations: {
      directory: "./data/migrations",
    }, seeds: {
      directory: "./data/tset/seeds",
    }, pool: {
      min: 2, max: 10,
    },
  },
  
  staging: {
    client: "postgresql", connection: {
      database: "synaps",
      user: "postgres",
      password: "incoh3r3nt&",
      port: "5500",
    }, migrations: {
      directory: "./data/migrations",
    }, seeds: {
      directory: "./data/seeds",
    }, pool: {
      min: 2, max: 10,
    },
  },
  
  production: {
    client: "postgresql", connection: process.env.DATABASE_URL, migrations: {
      directory: "./data/migrations",
    },
  },
};
