 import { auth, db } from "./firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const welcomeUser = document.getElementById("welcomeUser");
const usageCount = document.getElementById("usageCount");
const startStudyBtn = document.getElementById("startStudyBtn");
const logoutBtn = document.getElementById("logoutBtn");
const progressBar = document.getElementById("progressBar");

const subjectContainer = document.getElementById("subjectContainer");

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

    // Usage display
    usageCount.innerText = data.dailyUsage + " / 5";

    if (progressBar) {
      progressBar.style.width = (data.dailyUsage / 5) * 100 + "%";
    }

    // Get student class
    const studentClass = data.class;

    let subjects = [];

    // Subjects based on class
    if (studentClass <= 10) {

      subjects = ["Tamil","English","Maths","Science","Social"];

    } else {

      subjects = ["Tamil","English","Physics","Chemistry","Maths","Biology"];

    }

    // Create subject buttons
    if (subjectContainer) {

      subjectContainer.innerHTML = "";

      subjects.forEach(subject => {

        const btn = document.createElement("button");

        btn.className = "subject-btn";
        btn.innerText = subject;

        btn.onclick = () => {

          alert("You selected " + subject);

        };

        subjectContainer.appendChild(btn);

      });

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
