import { db } from "./firebaseConfig.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const studentId = sessionStorage.getItem("studentId");


document.getElementById("saveAllowance").addEventListener("click", async () => {
  const amount = Number(document.getElementById("allowanceAmount").value);
  const type = document.getElementById("allowanceType").value;

  let dailyBudget = amount;
  if (type === "weekly") dailyBudget = amount / 7;
  if (type === "monthly") dailyBudget = amount / 30;

  await set(ref(db, `Allowance/${studentId}`), {
    amount,
    type,
    dailyBudget
  });

  document.getElementById("dailyBudgetDisplay").innerText =
    `Daily Budget: ₱${dailyBudget.toFixed(2)}`;
});
