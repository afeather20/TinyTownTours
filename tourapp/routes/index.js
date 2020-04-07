const Router = require('express-promise-router')
var router = new Router();
module.exports = router;
const userDAL = require('../dal/userDAL.js');

/* GET home page. */
router.get('/', async (req, res) => {

  var mapStyle = await userDAL.getMapStyleForUser();

  res.render('index', { mapStyle: mapStyle } );

});

router.post('/createUser', async (req, res) => {
  var newUser = req.body;
  
  if(newUser.userName == '' || undefined){ 
    return res.status(409).send({error: 'You must provide a username for your user'})
  }
  else if(newUser.userEmail == '' || undefined) { 
    return res.status(409).send({error: 'You must provide a valid email for your user'})
  }
  else if((newUser.hashedPassword == '' || undefined) || newUser.hashedPassword.length < 8){ 
    return res.status(409).send({error: 'You mus provide a valid password for your user'})
  }
  else if( newUser.confirmHashedPassword == '' || undefined) { 
    return res.status(409).send({error: 'You must confirm your password'})
  }
  else if( newUser.hashedPassword != newUser.confirmHashedPassword){ 
    return res.status(409).send({error: 'Your passwords do not match'})
  }
  var createdUser = await userDAL.createNewUser(newUser);
  if(createdUser.code == '23505'){ 
    
    return res.status(409).send({error: createdUser.message})
  }
  return createdUser;
});

module.exports = router;
