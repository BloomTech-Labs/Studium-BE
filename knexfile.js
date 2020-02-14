// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "synaps",
      user: "postgres",
      password: "incoh3r3nt&",
      port: "5500"
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "synaps",
      user: "postgres",
      password: "incoh3r3nt&",
      port: "5500"
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABSE_URL,
    migrations: {
      directory: "./database/migrations"
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
