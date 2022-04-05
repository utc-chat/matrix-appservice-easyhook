# Matrix-Bot

## Installation

### Basic environment setting
Install [mysql](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04) on your server.

Install [nodejs](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04) on your server.

### Install global plugins.
After install mysql and node, please run the following commands.
```
npm install -g pm2
npm install -g nodemon
npm install -g react-scripts
npm install -g sequelize
npm install -g sequelize-cli
```

### Install local node modules
```
npm install
cd client
npm install
```

### Setting environment variables
```
cp .env.sample .env
cd client
cp .env.sample .env
```

```
PROD_MYSQL_HOSTNAME: Your Mysql hostname (default: localhost)
PROD_MYSQL_PORT: Your Mysql port (default: 3306)
PROD_MYSQL_USERNAME: Your Mysql username (default: root)
PROD_MYSQL_PASSWORD: Your Mysql password
PROD_MYSQL_DATABASE: Your Mysql hostname (default: utc_chat)
```

### Database Installation
Create a new database called "utc_chat" on your server.

https://www.digitalocean.com/community/tutorials/how-to-create-and-manage-databases-in-mysql-and-mariadb-on-a-cloud-server


After create a new database please run the following command to init your database.
```
sequelize db:migrate
sequelize db:seed:all
```

## Running

### For development
```
npm run dev
```

### For production

Start server
```
npm start
```

Stop server
```
npm stop
```
