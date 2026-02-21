import { auth, db } from "./firebase.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const saveBtn = document.getElementById("saveClassBtn");
const classSelect = document.getElementById("classSelect");

// Make sure user is logged in
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "index.html";
  }
});

// Save class selection
saveBtn.addEventListener("click", async () => {
  const selectedClass = classSelect.value;

  if (!selectedClass) {
    alert("Please select your class.");
    return;
  }

  const user = auth.currentUser;

  try {
    await updateDoc(doc(db, "users", user.uid), {
      class: selectedClass
    });

    window.location.href = "school-dashboard.html";

  } catch (error) {
    alert(error.message);
  }
});
