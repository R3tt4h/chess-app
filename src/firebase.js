// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmY5IZ-abRtQkE5LjMZxRs8gcRSTRwvzc",
    authDomain: "chess-app-4354a.firebaseapp.com",
    projectId: "chess-app-4354a",
    storageBucket: "chess-app-4354a.appspot.com",
    messagingSenderId: "645701900093",
    appId: "1:645701900093:web:2f755a85f6362026b19754"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore();