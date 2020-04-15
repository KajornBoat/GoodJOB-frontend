
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBDnEvPhhRUs17XzCALWXKLdnztviENgFM",
    authDomain: "goodjob-273317.firebaseapp.com",
    databaseURL: "https://goodjob-273317.firebaseio.com",
    projectId: "goodjob-273317",
    storageBucket: "goodjob-273317.appspot.com",
    messagingSenderId: "147525967656",
    appId: "1:147525967656:web:b083a2e0bc780df3203a1d",
    measurementId: "G-ZZXRPB7P7P",

};

firebase.initializeApp(firebaseConfig);

export default firebase;