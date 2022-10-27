const pgp = require('pg-promise')();

const DATABASE_URL= process.env.DATABASE_URL ||"postgres://fdtvdmlu:gTV2Ftb63f9zlkyCnTmwTflMbC8kYKAb@surus.db.elephantsql.com/fdtvdmlu"

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
//postgresql://mbali:mba123@localhost:5432/registration