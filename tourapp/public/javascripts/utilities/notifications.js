
function setNotifications() {
    Notification.requestPermission(function(status) {
        console.log('Notification permission status:', status);
    });
}

function displayNotification(message) {

  if (Notification.permission == 'granted') {

    navigator.serviceWorker.getRegistration().then(function(reg) {

      reg.showNotification(message);
    });
  }
}