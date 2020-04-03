$(document).ready(function() { 

    mapboxgl.accessToken = 'pk.eyJ1IjoiYWZlYXRoZXIyMCIsImEiOiJjazhmaDlrYmEwNDg2M2dzMHRycG4wMXJzIn0._FYX6dOkYeSWZTCyQtZs0w';
    // var map = L.mapbox.map('map')
    // .setView([47.6249, -122.5210], 12)
    // .addLayer(L.mapbox.styleLayer(PageData.mapStyles.styleurl));

    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: PageData.mapStyles.styleurl, // stylesheet location
        center: [-122.5210,47.6249 ], // starting position
        zoom: 12 // starting zoom
      });
});