importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyCvyCX7bdEqyAcVailXA2E4m8sN2tutwFM",
  authDomain: "literasiin-dev.firebaseapp.com",
  projectId: "literasiin-dev",
  storageBucket: "literasiin-dev.appspot.com",
  messagingSenderId: "147850382366",
  appId: "1:147850382366:web:340f7cb79ff896e273720f",
  measurementId: "G-N4X0GHL2P3"
};

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