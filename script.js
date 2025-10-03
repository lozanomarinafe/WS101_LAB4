let transactions = [
  { id: 1, type: "deposit", amount: 2500, date: "2025-10-01" },
  { id: 2, type: "dithdrawal", amount: 550, date: "2025-09-15" },
  { id: 3, type: "deposit", amount: 1200, date: "2025-09-28" },
  { id: 4, type: "withdrawal", amount: 800, date: "2025-09-10" }
];

const tbody = document.querySelector("#transactionTable tbody");
const resultBox = document.getElementById("results");
const filterDropdown = document.getElementById("filterType");

function showTransactions(list) {
  tbody.innerHTML = list.map(t => `
    <tr>
      <td>${t.id}</td>
      <td>${t.type}</td>
      <td>₱${t.amount}</td>
      <td>${t.date}</td>
    </tr>
  `).join("");
}

function calculateBalance() {
  const balance = transactions.reduce((total, t) => {
    return total + (t.type === "deposit" ? t.amount : -t.amount);
  }, 0);
  resultBox.textContent = `Current Balance: ₱${balance}`;
}

function findLargest() {
  if (transactions.length === 0) {
    resultBox.textContent = "No transactions available.";
    return;
  }
  const largest = [...transactions].sort((a, b) => b.amount - a.amount)[0];
  resultBox.textContent = `Largest Transaction: ${largest.type} ₱${largest.amount} (${largest.date})`;
}


function groupByMonth() {
  const groups = transactions.reduce((acc, t) => {
    const month = t.date.substring(0, 7); 
    acc[month] = acc[month] || [];
    acc[month].push(t);
    return acc;
  }, {});
  
  let summary = "Transactions by Month:\n";
  for (let m in groups) {
    summary += `${m}: ${groups[m].length} transaction(s)\n`;
  }
  resultBox.textContent = summary;
}

filterDropdown.addEventListener("change", () => {
  const value = filterDropdown.value;
  if (value === "all") {
    showTransactions(transactions);
  } else {
    showTransactions(transactions.filter(t => t.type === value));
  }
});

function fetchTransactions() {
  resultBox.textContent = "Fetching new data...";
  
  setTimeout(() => {
    const newTransaction = {
      id: transactions.length + 1,
      type: Math.random() > 0.5 ? "deposit" : "withdrawal",
      amount: Math.floor(Math.random() * 3000) + 100,
      date: `2025-10-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`
    };
    
    transactions.push(newTransaction);
    showTransactions(transactions);
    resultBox.textContent = "New transaction added!";
  }, 1200);
}

showTransactions(transactions);
