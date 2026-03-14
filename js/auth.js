 import { auth, db } from "./firebase.js";
import { selectedRole, checkRoleSelected } from "./role.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Elements
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const googleBtn = document.getElementById("googleLogin");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");


// ===== PASSWORD TOGGLE =====
if (togglePassword) {
  togglePassword.addEventListener("click", () => {

    const type =
      passwordInput.getAttribute("type") === "password"
        ? "text"
        : "password";

    passwordInput.setAttribute("type", type);

  });
}


// ===== SIGN UP =====
if (signupBtn) {

signupBtn.addEventListener("click", async () => {

  if (!checkRoleSelected()) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {

    const userCredential =
      await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    await sendEmailVerification(user);

    await setDoc(doc(db, "users", user.uid), {
      email: email,
      role: selectedRole,
      dailyUsage: 0,
      createdAt: new Date()
    });

    alert("Verification email sent! Please verify before login.");

  } catch (error) {
    alert(error.message);
  }

});
}


// ===== LOGIN =====
if (loginBtn) {

loginBtn.addEventListener("click", async () => {

  if (!checkRoleSelected()) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {

    const userCredential =
      await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    if (!user.emailVerified) {
      alert("Please verify your email first.");
      return;
    }

    const userDoc =
      await getDoc(doc(db, "users", user.uid));

    const userData = userDoc.data();

    if (userData.role === "school") {

      window.location.href = "setup-school.html";

    } else {

      window.location.href = "setup-college.html";

    }

  } catch (error) {
    alert(error.message);
  }

});
}


// ===== GOOGLE LOGIN =====
if (googleBtn) {

googleBtn.addEventListener("click", async () => {

  if (!checkRoleSelected()) return;

  const provider = new GoogleAuthProvider();

  try {

    const result =
      await signInWithPopup(auth, provider);

    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {

      await setDoc(userRef, {
        email: user.email,
        role: selectedRole,
        dailyUsage: 0,
        createdAt: new Date()
      });

    }

    const data = (await getDoc(userRef)).data();

    if (data.role === "school") {

      window.location.href = "setup-school.html";

    } else {

      window.location.href = "setup-college.html";

    }

  } catch (error) {
    alert(error.message);
  }

});
}
