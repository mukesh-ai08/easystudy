  import { auth, db } from "./firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const welcomeUser = document.getElementById("welcomeUser");
const usageCount = document.getElementById("usageCount");
const startStudyBtn = document.getElementById("startStudyBtn");
const logoutBtn = document.getElementById("logoutBtn");
const progressBar = document.getElementById("progressBar");

// Check login state
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  welcomeUser.innerText = "welcome, " + user.email;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();

    usageCount.innerText = data.dailyUsage + " / 5";

    if (progressBar) {
      progressBar.style.width = (data.dailyUsage / 5) * 100 + "%";
    }
  }

});


// Start study button
startStudyBtn.addEventListener("click", async () => {

  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return;

  const data = userSnap.data();

  if (data.dailyUsage >= 5) {
    alert("Daily limit reached. Upgrade coming soon 💜");
    return;
  }

  const newUsage = data.dailyUsage + 1;

  await updateDoc(userRef, {
    dailyUsage: newUsage
  });

  usageCount.innerText = newUsage + " / 5";

  if (progressBar) {
    progressBar.style.width = (newUsage / 5) * 100 + "%";
  }

  alert("AI question generated (demo). Usage updated.");

});


// Logout button
logoutBtn.addEventListener("click", async () => {

  await signOut(auth);
  window.location.href = "index.html";

});
