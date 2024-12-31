// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBEjPWfK41lUaaImRrg1Zk3JxjHRFaqGNM",
  authDomain: "react-b62b3.firebaseapp.com",
  projectId: "react-b62b3",
  storageBucket: "react-b62b3.appspot.com",
  messagingSenderId: "118725253078",
  appId: "1:118725253078:web:060b4d6cb8532952a8f677",
  measurementId: "G-EVD3DKJCB3"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);