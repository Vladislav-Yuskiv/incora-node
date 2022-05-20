const { Pool } = require('pg')
const client = new Pool({
      user:"postgres",
      password:"1234",
      host: "localhost",
      port: 5432,
      database:"incora_test"

})




 module.exports = {
      client
 }