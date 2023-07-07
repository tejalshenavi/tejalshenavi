document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expenseForm');
  const expenseList = document.getElementById('expenseList');

  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  // Function to render expenses
  function renderExpenses() {
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${expense.name}</td>
        <td>${expense.amount}</td>
        <td>
          <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
          <button class="btn btn-secondary btn-sm edit-btn" data-index="${index}">Edit</button>
        </td>
      `;
      expenseList.appendChild(row);
    });

    // Attach event listeners to delete and edit buttons
    const deleteButtons = document.getElementsByClassName('delete-btn');
    const editButtons = document.getElementsByClassName('edit-btn');

    Array.from(deleteButtons).forEach((button) => {
      button.addEventListener('click', deleteExpense);
    });

    Array.from(editButtons).forEach((button) => {
      button.addEventListener('click', editExpense);
    });
  }

  // Function to add an expense
  function addExpense(event) {
    event.preventDefault();
    const expenseNameInput = document.getElementById('expenseName');
    const expenseAmountInput = document.getElementById('expenseAmount');

    const name = expenseNameInput.value.trim();
    const amount = expenseAmountInput.value.trim();

    if (name === '' || amount === '') {
      return;
    }

    const expense = {
      name,
      amount
    };

    expenses.push(expense);
    expenseNameInput.value = '';
    expenseAmountInput.value = '';

    updateLocalStorage();
    renderExpenses();
  }

  // Function to delete an expense
  function deleteExpense(event) {
    const index = event.target.dataset.index;
    expenses.splice(index, 1);
    updateLocalStorage();
    renderExpenses();
  }

  // Function to edit an expense
  function editExpense(event) {
    const index = event.target.dataset.index;
    const expense = expenses[index];
    const newName = prompt('Enter new expense name:', expense.name);
    const newAmount = prompt('Enter new expense amount:', expense.amount);

    if (newName !== null && newAmount !== null) {
      expense.name = newName;
      expense.amount = newAmount;
      updateLocalStorage();
      renderExpenses();
    }
  }

  // Function to update local storage
  function updateLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  expenseForm.addEventListener('submit', addExpense);
  renderExpenses();
});
