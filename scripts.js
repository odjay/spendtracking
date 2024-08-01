let income = 0;
let expenses = [];

const incomeInput = document.getElementById('income-input');
const addIncomeBtn = document.getElementById('add-income');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseTypeSelect = document.getElementById('expense-type');
const addExpenseBtn = document.getElementById('add-expense');
const balanceEl = document.getElementById('balance');
const expenseListEl = document.getElementById('expense-list');
const ctx = document.getElementById('budget-graph').getContext('2d');

let chart;

addIncomeBtn.addEventListener('click', () => {
    income = parseFloat(incomeInput.value);
    updateBudget();
});

addExpenseBtn.addEventListener('click', () => {
    const name = expenseNameInput.value;
    const amount = parseFloat(expenseAmountInput.value);
    const type = expenseTypeSelect.value;

    if (name && amount) {
        expenses.push({ name, amount, type });
        updateBudget();
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
    }
});

function updateBudget() {
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const balance = income - totalExpenses;

    balanceEl.textContent = `Balance: $${balance.toFixed(2)}`;

    expenseListEl.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name}: $${expense.amount.toFixed(2)} (${expense.type})
            <button onclick="removeExpense(${index})">Remove</button>
        `;
        expenseListEl.appendChild(li);
    });

    updateGraph();
}

function removeExpense(index) {
    expenses.splice(index, 1);
    updateBudget();
}

function updateGraph() {
    const labels = ['Income', 'Expenses', 'Balance'];
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const balance = income - totalExpenses;
    const data = [income, totalExpenses, balance];

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Budget Overview',
                data: data,
                backgroundColor: ['#4CAF50', '#F44336', '#2196F3'],
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
