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

  var newUser = {
    userName: "afeather20",
    email: "afeather20@gamil.com",
    hashedPassword: "1234",
    firstName: "Adam",
    lastName: "Feather"
  }

  var createdUser = await userDAL.createNewUser(newUser);

});

module.exports = router;
