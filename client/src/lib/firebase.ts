// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-c8e1c.firebaseapp.com",
  projectId: "mern-c8e1c",
  storageBucket: "mern-c8e1c.firebasestorage.app",
  messagingSenderId: "619772178011",
  appId: "1:619772178011:web:5170158d70eedda8f1d97e",
  measurementId: "G-PGS84KBSJY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // ✅ Use new instance

export { auth, provider };
