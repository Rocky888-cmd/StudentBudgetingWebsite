const allowanceModal = document.getElementById("allowanceModal");
const expenseModal = document.getElementById("expenseModal");

document.getElementById("openAllowanceModal").onclick = () =>
  allowanceModal.style.display = "flex";

document.getElementById("openExpenseModal").onclick = () =>
  expenseModal.style.display = "flex";

document.querySelectorAll(".close").forEach(btn => {
  btn.onclick = () => {
    allowanceModal.style.display = "none";
    expenseModal.style.display = "none";
  };
});
