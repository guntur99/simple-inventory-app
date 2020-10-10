import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBZzb3KbioSd-olmL-WWclc-jiN8GOuyMA",
    authDomain: "simple-inventory-app-afaf7.firebaseapp.com",
    databaseURL: "https://simple-inventory-app-afaf7.firebaseio.com",
    projectId: "simple-inventory-app-afaf7",
    storageBucket: "simple-inventory-app-afaf7.appspot.com",
    messagingSenderId: "957245563137",
    appId: "1:957245563137:web:86c0f45130290977227b00",
    measurementId: "G-NFHTQB3EHK"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
