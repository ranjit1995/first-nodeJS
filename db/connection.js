const { createPool } = require('mysql');
exports.pool = createPool({
    host: "localhost",
    user: 'ranjit',
    password: 'Welcome@123',
    database: 'grocoon',
    connectionLimit: 20
});
