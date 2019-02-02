importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');


firebase.initializeApp({
  'apiKey': 'AIzaSyD9D1b2uxUn3-eBpxyZ0ICBwcUPbDgqtw0',
    'authDomain': 'prov-h-fae96.firebaseapp.com',
    'databaseURL': 'https://prov-h-fae96.firebaseio.com',
    'projectId': 'prov-h-fae96',
    'storageBucket': 'prov-h-fae96.appspot.com',
    
  'messagingSenderId': '579709768067'
});

const messaging = firebase.messaging();