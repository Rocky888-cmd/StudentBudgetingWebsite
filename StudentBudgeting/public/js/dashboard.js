import { db } from "./firebaseConfig.js";
import {
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const studentId = sessionStorage.getItem("studentId");

const today = new Date().toISOString().split("T")[0];

document.getElementById("logoutBtn").onclick = () => {
  sessionStorage.clear();
  window.location.href = "auth.html";
};


onValue(ref(db, `Allowance/${studentId}`), (snap) => {
  if (snap.exists()) {
    document.getElementById("dailyBudget").innerText = snap
      .val()
      .dailyBudget.toFixed(2);
  }
});

onValue(ref(db, `Transactions/${studentId}`), (snap) => {
  let spent = 0;
  const ledger = document.getElementById("ledger");
  ledger.innerHTML = "";

  snap.forEach((child) => {
    const tx = child.val();
    if (tx.date === today) spent += tx.amount;

    ledger.innerHTML += `
      <tr>
        <td>${tx.date}</td>
        <td>${tx.category}</td>
        <td>₱${tx.amount}</td>
        <td>${tx.desc}</td>
      </tr>
    `;
  });

  document.getElementById("spentToday").innerText = spent.toFixed(2);

  const daily = Number(document.getElementById("dailyBudget").innerText);

  const remainingEl = document.getElementById("remaining");
  const remaining = daily - spent;

  remainingEl.innerText = remaining.toFixed(2);

  remainingEl.style.color = remaining < 0 ? "#dc2626" : "#16a34a";
  document.getElementById("remaining").innerText = (daily - spent).toFixed(2);
});
