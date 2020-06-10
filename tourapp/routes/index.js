const Router = require('express-promise-router')
var router = new Router();
module.exports = router;
const userDAL = require('../dal/userDAL.js');

var ip = require('ip');


/* GET home page. */
router.get('/', async (req, res) => {

  await sessionChecker(req, res);

  //res.render('index', { mapStyle: mapStyle } );

});


router.post('/loginUser', async (req, res) => { 

  var userCredentials = req.body; 

  var loggedInUser = await userDAL.loginUser(userCredentials); 
  console.log(loggedInUser);
  if(loggedInUser.code == undefined) { 
    req.session.user = loggedInUser[0].rows[0];

    console.log(req.session.user);
    return res.status(200).send(req.session.user);
  }
  else { 
    return res.status(400).send(loggedInUser);
  }


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
  if(createdUser.code == undefined) { 
    return res.status(200).send(createdUser);
  }
  else{ 
    return res.status(400).send(createdUser);
  }
});


var sessionChecker = async (req, res, next) => {
 console.log(req.session.user);
 console.log(req.cookies.user_id);

 console.log("HITTING HERE BOI");
  var mapStyle = await userDAL.getMapStyleForUser(req.session.user);

  if (req.session.user && req.cookies.user_id) {
      res.render('index', { 
                            mapStyle: mapStyle, 
                            userData: req.session.user,
                            socketIpAddress: 'https://localhost:3002'
                          } );
  } else {
    res.render('index', { 
                            mapStyle: mapStyle, 
                            userData: 0,
                            socketIpAddress: 'https://localhost:3002'} );
  }
};

module.exports = router;
