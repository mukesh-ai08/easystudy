 // get firebase instances
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

const welcomeUser = document.getElementById("welcomeUser");
const usageCount = document.getElementById("usageCount");
const startStudyBtn = document.getElementById("startStudyBtn");
const logoutBtn = document.getElementById("logoutBtn");

// check login
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
  }
});

// start study button
startStudyBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  const data = userSnap.data();

  if (data.dailyUsage >= 5) {
    alert("daily limit reached. upgrade coming soon 💜");
    return;
  }

  const newUsage = data.dailyUsage + 1;

  await updateDoc(userRef, {
    dailyUsage: newUsage
  });

  usageCount.innerText = newUsage + " / 5";

  alert("ai question generated (demo). usage updated.");
});

// logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});
