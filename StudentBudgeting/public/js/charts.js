import { db } from "./firebaseConfig.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const studentId = sessionStorage.getItem("studentId");


const barCtx = document.getElementById("weeklyBarChart");
const pieCtx = document.getElementById("expensePieChart");

let barChart, pieChart;

onValue(ref(db, `Transactions/${studentId}`), snap => {
  const week = [0,0,0,0,0,0,0];
  const categories = {};

  snap.forEach(c => {
    const t = c.val();
    const d = new Date(t.date).getDay(); // 0–6
    week[d] += t.amount;
    categories[t.category] = (categories[t.category] || 0) + t.amount;
  });

  // BAR CHART
  if (barChart) barChart.destroy();
  barChart = new Chart(barCtx, {
    type: "bar",
    data: {
      labels: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
      datasets: [{
        label: "Expenses (₱)",
        data: week,
        backgroundColor: "#2563eb"
      }]
    }
  });

  // PIE CHART
  if (pieChart) pieChart.destroy();
  pieChart = new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: Object.keys(categories),
      datasets: [{
        data: Object.values(categories),
        backgroundColor: [
          "#16a34a", "#2563eb", "#f59e0b", "#dc2626"
        ]
      }]
    }
  });
});
