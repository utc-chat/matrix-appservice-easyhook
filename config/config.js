require('dotenv').config();

module.exports = {
  development: {
    host: process.env.PROD_MYSQL_HOSTNAME,
    port: process.env.PROD_MYSQL_PORT,
    username: process.env.PROD_MYSQL_USERNAME,
    password: process.env.PROD_MYSQL_PASSWORD,
    database: process.env.PROD_MYSQL_DATABASE,
    dialect: 'mysql',
    logging: false,
    secret: "utc_chat",
    timezone: '-05:00',
    system: {
      host: process.env.PROD_MYSQL_HOSTNAME,
      port: process.env.PROD_MYSQL_PORT,
      username: process.env.PROD_MYSQL_USERNAME,
      password: process.env.PROD_MYSQL_PASSWORD,
      database: process.env.PROD_MYSQL_DATABASE,
      dialect: 'mysql',
      logging: false,
      secret: "utc_chat",
      dialectOptions: {
        useUTL: false
      },
      timezone: '-05:00',
    },
    databases: {
      system: {
        host: process.env.PROD_MYSQL_HOSTNAME,
        port: process.env.PROD_MYSQL_PORT,
        username: process.env.PROD_MYSQL_USERNAME,
        password: process.env.PROD_MYSQL_PASSWORD,
        database: process.env.PROD_MYSQL_DATABASE,
        dialect: 'mysql',
        logging: false,
        secret: "utc_chat",
        dialectOptions: {
          // useUTL: false
        },
        timezone: '-05:00',
      },
      fishbowl: {
        host: process.env.PROD_FISHBOWL_HOSTNAME,
        port: process.env.PROD_FISHBOWL_PORT,
        username: process.env.PROD_FISHBOWL_USERNAME,
        passwoerd: process.env.PROD_FISHBOWL_PASSWORD,
        database: process.env.PROD_FISHBOWL_DATABASE,
        dialect: "mysql",
        logging: false,
        dialectOptions: {
          useUTL: false
        },
        timezone: '-05:00',
      }
    },
    test: {
      username: "root",
      password: '',
      database: "database_test",
      // host: "127.0.0.1",        
      host: process.env.PROD_MYSQL_HOSTNAME,
      port: process.env.PROD_MYSQL_PORT,
      dialect: "mysql",
      dialectOptions: {
        useUTL: false
      },
      timezone: '-05:00',
    }
  },
  production: {
    host: process.env.PROD_MYSQL_HOSTNAME,
    port: process.env.PROD_MYSQL_PORT,
    username: process.env.PROD_MYSQL_USERNAME,
    password: process.env.PROD_MYSQL_PASSWORD,
    database: process.env.PROD_MYSQL_DATABASE,
    dialect: 'mysql',
    logging: false,
    secret: "utc_chat",
    dialectOptions: {
      useUTL: false
    },
    timezone: '-05:00',
    system: {
      host: process.env.PROD_MYSQL_HOSTNAME,
      port: process.env.PROD_MYSQL_PORT,
      username: process.env.PROD_MYSQL_USERNAME,
      password: process.env.PROD_MYSQL_PASSWORD,
      database: process.env.PROD_MYSQL_DATABASE,
      dialect: 'mysql',
      logging: false,
      secret: "utc_chat",
      dialectOptions: {
        useUTL: false
      },
      timezone: '-05:00',
    },
    databases: {
      system: {
        host: process.env.PROD_MYSQL_HOSTNAME,
        port: process.env.PROD_MYSQL_PORT,
        username: process.env.PROD_MYSQL_USERNAME,
        password: process.env.PROD_MYSQL_PASSWORD,
        database: process.env.PROD_MYSQL_DATABASE,
        dialect: 'mysql',
        logging: false,
        secret: "utc_chat",
        dialectOptions: {
          // useUTL: false
        },
        timezone: '-05:00',
      },
      fishbowl: {
        host: process.env.PROD_FISHBOWL_HOSTNAME,
        port: process.env.PROD_FISHBOWL_PORT,
        username: process.env.PROD_FISHBOWL_USERNAME,
        passwoerd: process.env.PROD_FISHBOWL_PASSWORD,
        database: process.env.PROD_FISHBOWL_DATABASE,
        dialect: "mysql",
        logging: false,
        dialectOptions: {
          useUTL: false
        },
        timezone: '-05:00',
      }
    },
    test: {
      username: "root",
      password: '',
      database: "database_test",
      // host: "127.0.0.1",        
      host: process.env.PROD_MYSQL_HOSTNAME,
      port: process.env.PROD_MYSQL_PORT,
      dialect: "mysql",
      dialectOptions: {
        useUTL: false
      },
      timezone: '-05:00',
    }
  },
};