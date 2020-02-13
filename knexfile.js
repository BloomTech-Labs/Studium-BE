// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "synaps",
      user: "postgres",
      password: "incoh3r3nt&"
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      }
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "synaps",
      user: "postgres",
      password: "incoh3r3nt&"
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      }
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "synaps",
      user: "postgres",
      password: "incoh3r3nt&"
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      }
    }
  }
};
