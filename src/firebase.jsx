import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyDWvaYiWHwWGFAFoJ1Dc1YoknbOje80dZQ",
    authDomain: "iot-9294-2023.firebaseapp.com",
    databaseURL: "https://iot-9294-2023-default-rtdb.firebaseio.com",
    projectId: "iot-9294-2023",
    storageBucket: "iot-9294-2023.appspot.com",
    messagingSenderId: "102225599664",
    appId: "1:102225599664:web:e5d9fc37833a9b541b6f75"
};

firebase.initializeApp(firebaseConfig);

export default firebase;