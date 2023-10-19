import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyD1SCd66kyIVYZEazoMMHQFuP0pGewu5Qc",
    authDomain: "react-netflix-clone-2d75f.firebaseapp.com",
    projectId: "react-netflix-clone-2d75f",
    storageBucket: "react-netflix-clone-2d75f.appspot.com",
    messagingSenderId: "764811125014",
    appId: "1:764811125014:web:9ae59ba218a98bd99ab037",
    measurementId: "G-X1XV82WMJV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firebaseAuth = getAuth(app);