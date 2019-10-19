import firebase from "firebase";
import "firebase/firestore";
import config from "./firebaseConfig";
const firebaseApp = firebase.initializeApp(config);
export default firebaseApp.firestore();
