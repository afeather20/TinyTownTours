$(document).ready(function() { 
  var userPosition = []; 
  var map;

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#logoButton').on('click', function () {
      // $('.sideBarClass').toggleClass('active');
      $('#mainSideNav').toggleClass('active');
  });

  $('#eventMenu').on('click', function () {
    $('#mainSideNav').toggleClass('active');
  });

  $('#events').on('click', function () {
    $('#sidebar2').toggleClass('active');
  });


  //Set up Navigator geolocation
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


  //Add in mapbox geolocation token
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWZlYXRoZXIyMCIsImEiOiJjazhmaDlrYmEwNDg2M2dzMHRycG4wMXJzIn0._FYX6dOkYeSWZTCyQtZs0w';



    function showPosition(position) {
      userPosition = [];
      userPosition.push(position.coords.longitude); 
      userPosition.push(position.coords.latitude);
    
      map = new mapboxgl.Map({
        container: 'map', // container id
        style: PageData.mapStyles.styleurl, // stylesheet location
        center: userPosition, // starting position
        zoom: 20 // starting zoom
      });
    
      var locationController = new mapboxgl.GeolocateControl({
    
        positionOptions: {
          enableHighAccuracy: true
        },
        fitBoundsOptions:{ 
          zoom: 16
        },
        showAccuracyCircle:false,
        trackUserLocation: true,
    
      })
      map.addControl(locationController);
      map.on('load', function()
      {
        locationController.trigger();
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


    setServiceWorker();

    setNotifications();
});





