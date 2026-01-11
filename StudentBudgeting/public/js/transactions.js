import { db } from "./firebaseConfig.js";
import {
  ref,
  push,
  set
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const studentId = sessionStorage.getItem("studentId");


document.getElementById("addExpense").addEventListener("click", async () => {
  const amount = Number(document.getElementById("expenseAmount").value);
  const category = document.getElementById("expenseCategory").value;
  const desc = document.getElementById("expenseDesc").value;

  if (!amount) return alert("Enter amount");

  const date = new Date().toISOString().split("T")[0];

  const txRef = push(ref(db, `Transactions/${studentId}`));
  await set(txRef, {
    date,
    category,
    amount,
    desc,
    debit: `${category} Expense`,
    credit: "Cash"
  });
});
