// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId, measurementId } from "@env"
// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: apiKey,
    // authDomain: authDomain,
    // databaseURL: databaseURL,
    // projectId: projectId,
    // storageBucket: storageBucket,
    // messagingSenderId: messagingSenderId,
    // appId: appId,
    // measurementId: measurementId,
    apiKey: "AIzaSyB0iD0wNUTA6czGahbEBcYh40hn7bNQJtw",
    authDomain: "cs5520ass2.firebaseapp.com",
    databaseURL: "https://cs5520ass2-default-rtdb.firebaseio.com",
    projectId: "cs5520ass2",
    storageBucket: "cs5520ass2.appspot.com",
    messagingSenderId: "151513782032",
    appId: "1:151513782032:web:cdbb26bf37b387d3297795",
    measurementId: "G-RMWFPSQMHM"
};

let myApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(myApp);
console.log(module.exports);