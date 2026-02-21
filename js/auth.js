import { selectedRole, checkRoleSelected } from "./role.js";
import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");

signupBtn.addEventListener("click", async () => {
  if (!checkRoleSelected()) return;

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send verification email
    await sendEmailVerification(user);

    // Save user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      role: selectedRole,
      dailyUsage: 0,
      createdAt: new Date()
    });

    alert("Verification email sent! Please verify before login.");

  } catch (error) {
    errorMsg.textContent = error.message;
  }
});

loginBtn.addEventListener("click", async () => {
  if (!checkRoleSelected()) return;

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      alert("Please verify your email first.");
      return;
    }

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();

    if (userData.role === "school") {
      window.location.href = "setup-school.html";
    } else {
      window.location.href = "setup-college.html";
    }

  } catch (error) {
    errorMsg.textContent = error.message;
  }
});
