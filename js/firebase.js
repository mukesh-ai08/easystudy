// Import Firebase modules (v9 modular CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "easystudy-96fa3.firebaseapp.com",
  projectId: "easystudy-96fa3",
  storageBucket: "easystudy-96fa3.firebasestorage.app",
  messagingSenderId: "222839424679",
  appId: "1:222839424679:web:e25be32c8936b4d6643d82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);
