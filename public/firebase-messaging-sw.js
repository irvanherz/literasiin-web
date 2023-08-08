
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {"apiKey":"AIzaSyCa06drdp_tFiQFd1_7lyMVgYp0GwXTWi4","authDomain":"literasiin-dev-380817.firebaseapp.com","projectId":"literasiin-dev-380817","storageBucket":"literasiin-dev-380817.appspot.com","messagingSenderId":"18583978221","appId":"1:18583978221:web:05deb809c8638781950ce4","measurementId":"G-X5VFPG58DQ"};

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
