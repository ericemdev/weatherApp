// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCY2gUKzB9ex9Opc33ohE841VtrKvI2AK4",
    authDomain: "weatherapp-f6319.firebaseapp.com",
    projectId: "weatherapp-f6319",
    storageBucket: "weatherapp-f6319.firebasestorage.app",
    messagingSenderId: "621366856665",
    appId: "1:621366856665:web:71c633e10903a6031267c8",
    measurementId: "G-K8EDCW3GKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);