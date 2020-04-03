const { Pool } = require('pg')

const pool = new Pool({
    user: 'wlvgfodjgilitd',
    host: 'ec2-3-91-112-166.compute-1.amazonaws.com',
    database: 'd6lb32jvjqpa46',
    password: 'fa33a9ff91fe75a986d782bd0622060e240d7a393ac6cedebdfa11974d14b53c',
    port: 5432
})

module.exports = {
  query: async (text, params) => {
    console.log(text);
    console.log(params);
    const start = Date.now();
    var promiseArray = [];
    for(i = 0; i < text.length; i++){ 
      promiseArray.push(pool.query(text[i], params[i]));
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