// MODAL
const modal = document.getElementById("registerModal");
document.getElementById("openRegister").onclick = () => modal.style.display = "flex";
document.getElementById("closeRegister").onclick = () => modal.style.display = "none";

// AUTO SLASH FOR BIRTHDATE
function formatBirthdate(input) {
  input.addEventListener("input", () => {
    let v = input.value.replace(/\D/g, "");
    if (v.length >= 3) v = v.slice(0,2) + "/" + v.slice(2);
    if (v.length >= 6) v = v.slice(0,5) + "/" + v.slice(5,9);
    input.value = v;
  });
}

formatBirthdate(document.getElementById("loginBirthdate"));
formatBirthdate(document.getElementById("regBirthdate"));

// LOGIN (DEMO ONLY)
document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();

  const studentId = loginStudentId.value.trim();
  const birthdate = loginBirthdate.value.trim();

  if (!studentId || birthdate.length !== 10) {
    alert("Invalid login credentials");
    return;
  }

  // SAVE LOGIN SESSION
  sessionStorage.setItem("studentId", studentId);

  // REDIRECT TO DASHBOARD
  window.location.href = "index.html";
});


// REGISTER (DEMO ONLY)
document.getElementById("registerBtn").onclick = () => {
  alert("Registered successfully!");
  modal.style.display = "none";
};
