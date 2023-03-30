
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {"apiKey":"AIzaSyAqcciHaSqTvlujZAhe5P7B4HB7Onh63u4","authDomain":"literasiin-dev-8af6d.firebaseapp.com","projectId":"literasiin-dev-8af6d","storageBucket":"literasiin-dev-8af6d.appspot.com","messagingSenderId":"517801728724","appId":"1:517801728724:web:c1dd7f0a01ec756a8e3941","measurementId":"G-HRFZ7FW2PT"};

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
