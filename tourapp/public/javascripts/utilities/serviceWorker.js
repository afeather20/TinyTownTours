function setServiceWorker() { 
    if('serviceWorker' in navigator ){
        try {
          navigator.serviceWorker.register('sw.js');
          console.log("Service Worker Registered");
        } catch (error) {
          console.log("Service Worker Registration Failed");
        }
      }
}

