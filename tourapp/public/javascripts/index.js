$(document).ready(function() { 
  var userPosition = []; 
  var map;
  console.log(PageData);


  if (navigator.geolocation) {
    var timeoutVal = 10 * 1000 * 1000;
    navigator.geolocation.getCurrentPosition(
      showPosition,
      displayError,
      { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
    )
  }
  else {
    alert("Geolocation is not supported by this browser");
  }

  //  navigator.geolocation.getCurrentPosition(showPosition, \\\)
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWZlYXRoZXIyMCIsImEiOiJjazhmaDlrYmEwNDg2M2dzMHRycG4wMXJzIn0._FYX6dOkYeSWZTCyQtZs0w';
    // var map = L.mapbox.map('map')

    // .addLayer(L.mapbox.styleLayer(PageData.mapStyles.styleurl));

    function showPosition(position) {
      console.log(position);
      userPosition = [];
      userPosition.push(position.coords.longitude); 
      userPosition.push(position.coords.latitude);

      map = new mapboxgl.Map({
        container: 'map', // container id
        style: PageData.mapStyles.styleurl, // stylesheet location
        center: userPosition, // starting position
        zoom: 16 // starting zoom
      });

      map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true
          })
        );
    }
  

    function displayError(error) {
      var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
      };
      alert("Error: " + errors[error.code]);
    }


    Notification.requestPermission(function(status) {
      console.log('Notification permission status:', status);
  });
  
  
  function displayNotification(message) {

    if (Notification.permission == 'granted') {

      navigator.serviceWorker.getRegistration().then(function(reg) {

        reg.showNotification(message);
      });
    }
  }


    if('serviceWorker' in navigator ){
      try {
        navigator.serviceWorker.register('sw.js');
        console.log("Service Worker Registered");
      
      } catch (error) {
        console.log("Service Worker Registration Failed");
      }
    }

});