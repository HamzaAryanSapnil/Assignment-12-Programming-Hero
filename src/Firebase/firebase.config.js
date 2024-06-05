// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9wISwm0laqtgWjnzSWgjkgngm-HwA0D4",
  authDomain: "assignment-12-tourist-guide.firebaseapp.com",
  projectId: "assignment-12-tourist-guide",
  storageBucket: "assignment-12-tourist-guide.appspot.com",
  messagingSenderId: "364135379959",
  appId: "1:364135379959:web:0cb15622a028e670df34f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth