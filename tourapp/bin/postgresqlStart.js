const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tourapp',
    password: '1234',
    port: 5432
})

module.exports = {
  //This gets called if we want to do multiple quries at the same time things that do not depend on each other
  querySynchronous: async (text, params) => {

    const start = Date.now();
    var promiseArray = [];
    for(i = 0; i < text.length; i++){ 
      promiseArray.push(pool.query(text[i], params[i]));
    }

    var returnData = await Promise.all(promiseArray);
    
    return returnData;
  },
  queryAsynchronous: async (text, params) => {
    //This gets called if we need these queries to
      const start = Date.now();
      var promiseArray = [];
      for(i = 0; i < text.length; i++){ 
        promiseArray.push(await pool.query(text[i], params[i]));
      }

    //Send ALl queires to the db at the same time
    
    var returnData = await Promise.all(promiseArray);
    
    return returnData;
  },
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      const query = client.query
      // monkey patch the query method to keep track of the last query executed
      client.query = (...args) => {
        client.lastQuery = args
        return query.apply(client, args)
      }
      // set a timeout of 5 seconds, after which we will log this client's last query
      const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 seconds!')
        console.error(`The last executed query on this client was: ${client.lastQuery}`)
      }, 5000)
      const release = (err) => {
        // call the actual 'done' method, returning this client to the pool
        done(err)
        // clear our timeout
        clearTimeout(timeout)
        // set the query method back to its old un-monkey-patched version
        client.query = query
      }
    })
  }
}