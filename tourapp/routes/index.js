var express = require('express');
var router = express.Router();
// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
// $(document).ready(function(){
// mapboxgl.accessToken = 'pk.eyJ1IjoiYWZlYXRoZXIyMCIsImEiOiJjazhmaDlrYmEwNDg2M2dzMHRycG4wMXJzIn0._FYX6dOkYeSWZTCyQtZs0w';
// var map = new mapboxgl.Map({
// container: 'map',
// style: 'mapbox://styles/afeather20/ck8fllohn0dgi1iqwv538cggu'
// });
// })
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
