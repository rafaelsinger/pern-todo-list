const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'clon3BONE!',
    host: 'localhost',
    port: 5432,
    database: 'perntodo'
});

module.exports = pool;