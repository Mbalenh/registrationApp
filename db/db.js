const pgp = require('pg-promise')();

const DATABASE_URL= process.env.DATABASE_URL ||"postgresql://mbali:mba123@localhost:5432/registration"

const config = { 
  connectionString : DATABASE_URL
}

if (process.env.NODE_ENV == 'production') {
  config.ssl = { 
    rejectUnauthorized : false
  }
}

const db = pgp(config);
module.exports = db;