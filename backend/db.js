const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'YOUR_CLOUD_SQL_IP',
  database: 'taskdb',
  password: 'yourpassword',
  port: 5432,
});
module.exports = pool;
