$(document).ready(function() { 
  var userPosition = []; 
  var map;
  if (navigator.geolocation) {
    var timeoutVal = 10 * 1000 * 1000;
    navigator.geolocation.getCurrentPosition(
      showPosition,
      displayError,
      { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
    );
  }
  else {
    alert("Geolocation is not supported by this browser");
  }


  console.log(PageData.userData);
  //  navigator.geolocation.getCurrentPosition(showPosition, \\\)
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWZlYXRoZXIyMCIsImEiOiJjazhmaDlrYmEwNDg2M2dzMHRycG4wMXJzIn0._FYX6dOkYeSWZTCyQtZs0w';
    // var map = L.mapbox.map('map')

    // .addLayer(L.mapbox.styleLayer(PageData.mapStyles.styleurl));

    function showPosition(position) {
      console.log(position);
      userPosition.push(position.coords.longitude); 
      userPosition.push(position.coords.latitude);
      console.log(userPosition);

       map = new mapboxgl.Map({
        container: 'map', // container id
        style: PageData.mapStyles.styleurl, // stylesheet location
        center: userPosition, // starting position
        zoom: 16 // starting zoom
      });
      map.on('load', function() {
        map.loadImage(
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png',
            function(error, image) {
                if (error) throw error;
                map.addImage('cat', image);
                map.addSource('point', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': userPosition
                                }
                            }
                        ]
                    }
                });
                map.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'point',
                    'layout': {
                        'icon-image': 'cat',
                        'icon-size': 0.25
                    }
                });
            }
        );
    });
    }
    function displayError(error) {
      var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
      };
      alert("Error: " + errors[error.code]);
    }





     
    

   
    
});