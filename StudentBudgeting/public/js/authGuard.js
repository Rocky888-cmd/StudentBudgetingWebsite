// js/authGuard.js

const studentId = sessionStorage.getItem("studentId");

if (!studentId) {
  // Not logged in → block access
  window.location.replace("auth.html");
}
