$(document).ready(function() { 
  var userPosition = []; 
  var map;
   navigator.geolocation.getCurrentPosition(showPosition)
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWZlYXRoZXIyMCIsImEiOiJjazhmaDlrYmEwNDg2M2dzMHRycG4wMXJzIn0._FYX6dOkYeSWZTCyQtZs0w';
    // var map = L.mapbox.map('map')

    // .addLayer(L.mapbox.styleLayer(PageData.mapStyles.styleurl));

    function showPosition(position) {

      var positionArray = [position.coords.latitude,position.coords.longitude ]
      userPosition.push(position.coords.longitude); 
      userPosition.push(position.coords.latitude);
      console.log(userPosition);
      map = new mapboxgl.Map({
        container: 'map', // container id
        style: PageData.mapStyles.styleurl, // stylesheet location
        center: userPosition, // starting position
        zoom: 12 // starting zoom
      });
    }
   
    
});