 export let selectedRole = null;

const roleButtons = document.querySelectorAll(".role-btn");
const errorMsg = document.getElementById("errorMsg");

roleButtons.forEach(button => {
  button.addEventListener("click", () => {

    // Remove active from all
    roleButtons.forEach(btn => btn.classList.remove("active"));

    // Add active to clicked
    button.classList.add("active");

    selectedRole = button.dataset.role;

    errorMsg.textContent = "";
  });
});

// Function to check role before auth
function checkRoleSelected() {
  if (!selectedRole) {
    errorMsg.textContent = "Please select School or College role.";
    return false;
  }
  return true;
}
