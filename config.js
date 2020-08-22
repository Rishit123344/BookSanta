import * as firebase from 'firebase'
require ('@firebase/firestore')
 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyA4SH1C81UWCaiqjddeanM8lUlPiKbJbt8",
   authDomain: "santa-34da8.firebaseapp.com",
    databaseURL: "https://santa-34da8.firebaseio.com",
     projectId: "santa-34da8", 
     storageBucket: "santa-34da8.appspot.com",
      messagingSenderId: "224791128652",
       appId: "1:224791128652:web:b90212b952fc371ede22e9",
        measurementId: "G-8HYXTV5EPK"
};
// Initialize Firebase
//if(!firebase.apps.length){}
 firebase.initializeApp(firebaseConfig); 
export default firebase.firestore();