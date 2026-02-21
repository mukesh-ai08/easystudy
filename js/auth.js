const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const errorMsg = document.getElementById("errorMsg");

// Temporary logic before Firebase
signupBtn.addEventListener("click", () => {
  if (!checkRoleSelected()) return;

  alert("Sign Up clicked with role: " + selectedRole);
});

loginBtn.addEventListener("click", () => {
  if (!checkRoleSelected()) return;

  alert("Login clicked with role: " + selectedRole);
});
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
});
