 // Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNT5bDtlPyoSBZvv_NFTmATIMLRIvpBLQ",
  authDomain: "easystudy-96fa3.firebaseapp.com",
  projectId: "easystudy-96fa3",
  storageBucket: "easystudy-96fa3.firebasestorage.app",
  messagingSenderId: "222839424679",
  appId: "1:222839424679:web:e25be32c8936b4d6643d82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Export for other JS files
export { auth, db };
