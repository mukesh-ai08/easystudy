 // Selected role variable
export let selectedRole = null;

// Get buttons
const schoolBtn = document.getElementById("schoolBtn");
const collegeBtn = document.getElementById("collegeBtn");

// Function to activate selected button
function activateButton(button) {
  schoolBtn.classList.remove("active");
  collegeBtn.classList.remove("active");

  button.classList.add("active");
}

// School button click
schoolBtn.addEventListener("click", () => {
  selectedRole = "school";
  activateButton(schoolBtn);
});

// College button click
collegeBtn.addEventListener("click", () => {
  selectedRole = "college";
  activateButton(collegeBtn);
});

// Export role check function
export function checkRoleSelected() {
  if (!selectedRole) {
    alert("Please select School or College role.");
    return false;
  }
  return true;
}
