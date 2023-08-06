
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {"apiKey":"AIzaSyDdmprrj4GTgy3U66XlyRyM98aJYgrSGW8","authDomain":"literasiin-fff26.firebaseapp.com","projectId":"literasiin-fff26","storageBucket":"literasiin-fff26.appspot.com","messagingSenderId":"783671940762","appId":"1:783671940762:web:509c23bc94cd6f94247123","measurementId":"G-F4J9BDT849"};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
