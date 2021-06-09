import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { seedDatabase } from '../seed'

// import seed file

const config = {
    apiKey: "AIzaSyCPr5gfEtyYDnP_tfsBCaP3n0Ja2_VlOXA",
    authDomain: "webdot-instagram-clone.firebaseapp.com",
    projectId: "webdot-instagram-clone",
    storageBucket: "webdot-instagram-clone.appspot.com",
    messagingSenderId: "639415594114",
    appId: "1:639415594114:web:48f15cf89af2561fa7589b",
    measurementId: "G-6JK0VVQ7G1"
}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore;

// call seed file only once using seedDatabase(firebase)
// seedDatabase(firebase);

export { firebase, FieldValue };