const mysql = require('mysql')

const util = require( 'util' ); 

const config = {
  host: 'remotemysql.com',
  port: '3306',
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: 'kW8zfl2jBR',
}
function con(){ 
  const connection = mysql.createConnection( config );
  return {
    query( sql, args ) {
      return util.promisify( connection.query )
        .call( connection, sql, args );
    },
    close() {
      return util.promisify( connection.end ).call( connection );
    }
  };
}

module.exports = con()


 
 
