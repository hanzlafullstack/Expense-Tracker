const Description__Input = document.getElementById('Description__Input');
const Amount__Input = document.getElementById('Amount__Input');
const Add__Transaction__Button = document.getElementById('Add__Transaction__Button');

const Current__Balance = document.getElementById("Current__Balance");
const Income__Amount = document.getElementById("Income__Amount");
const Expense__Amount = document.getElementById("Expense__Amount");
const Transaction__list = document.querySelector(".Transaction__list");
const Delete__Button__All = document.querySelector(".Delete__Button__All");

// Event listeners for Enter key
Description__Input.addEventListener("keypress",(event)=>{
    if(Description__Input.value.trim() !== ""){
        if(event.key == "Enter"){
            event.preventDefault();
            if(Amount__Input.value == ""){
                Amount__Input.focus();
            }
            else{
                Add__Transaction();
            }
    }
    }
    else if(Description__Input.value.trim() == ""){
        if(event.key == "Enter"){
            event.preventDefault();
            window.alert("Enter the Description!")
        }
    }
})

Amount__Input.addEventListener("keypress",(event)=>{
    if(Amount__Input.value.trim() !== ""){
        if(event.key == "Enter"){
            event.preventDefault();
            if(Description__Input.value == ""){
                Description__Input.focus();
            }
            else{
                Add__Transaction();
            }
        }
    }
    else if(Amount__Input.value.trim() == ""){
        if(event.key == "Enter"){
            event.preventDefault();
            window.alert("Enter the Amount!")
        }
    }
})

function Add__Transaction() {
    if(Description__Input.value.trim() !== "" && (Amount__Input.value.trim() !== "")){
        addInformationToList();
    }
    else if(Amount__Input.value.trim() == ""){
         window.alert("Enter the Amount!")
    }
    else if(Description__Input.value.trim() == ""){
         window.alert("Enter the Description!")
    }
}
    
Add__Transaction__Button.addEventListener("click",()=>{
    if(Description__Input.value.trim() !== "" && (Amount__Input.value.trim() !== "")){
        addInformationToList();
    }
    else if(Amount__Input.value.trim() == ""){
         window.alert("Enter the Amount!")
    }
    else if(Description__Input.value.trim() == ""){
         window.alert("Enter the Description!")
    }
});

function clearTheInputBoxes() {
    Description__Input.value = "";
    Amount__Input.value = "";
}

// Simple function to calculate and update all amounts
function updateAllAmounts() {
    const transactions = Transaction__list.querySelectorAll('.list__item__Amount');
    let totalIncome = 0;
    let totalExpense = 0;
    
    transactions.forEach(transaction => {
        const amount = parseFloat(transaction.textContent);
        if (amount > 0) {
            totalIncome += amount;
        } else {
            totalExpense += Math.abs(amount);
        }
    });
    
    const balance = totalIncome - totalExpense;
    
    // Update display
    Current__Balance.textContent = balance.toFixed(2);
    Income__Amount.textContent = totalIncome.toFixed(2);
    Expense__Amount.textContent = totalExpense.toFixed(2);
}

// Save data to localStorage
function saveData() {
    const transactions = [];
    const transactionItems = Transaction__list.querySelectorAll('.list__Item');
    
    transactionItems.forEach(item => {
        const description = item.querySelector('.list__item__Text').textContent;
        const amount = parseFloat(item.querySelector('.list__item__Amount').textContent);
        transactions.push({ description, amount });
    });
    
    const data = {
        transactions: transactions,
        balance: parseFloat(Current__Balance.textContent),
        income: parseFloat(Income__Amount.textContent),
        expense: parseFloat(Expense__Amount.textContent)
    };
    
    localStorage.setItem('expenseTrackerData', JSON.stringify(data));
}

// Load data from localStorage
function loadData() {
    const savedData = localStorage.getItem('expenseTrackerData');
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Update amounts
        Current__Balance.textContent = data.balance.toFixed(2);
        Income__Amount.textContent = data.income.toFixed(2);
        Expense__Amount.textContent = data.expense.toFixed(2);
        
        // Recreate transaction list
        Transaction__list.innerHTML = '';
        data.transactions.forEach(transaction => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <div class="list__Item ${transaction.amount < 0 ? 'red__border' : 'green__border'}">
                    <span class="list__item__Text">${transaction.description}</span>
                    <div class="amount__Button__Box">
                        <p><span class="list__item__Amount">${transaction.amount.toFixed(2)}</span>$</p>
                        <button class="Delete__Button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </div>
                </div>
            `;
            
            Transaction__list.appendChild(listItem);
            
            // Add delete functionality
            const Delete__Button = listItem.querySelector(".Delete__Button");
            Delete__Button.addEventListener("click", () => {
                Transaction__list.removeChild(listItem);
                updateAllAmounts();
                saveData();
            });

            Delete__Button__All.addEventListener("click",()=>{
        Current__Balance.textContent = "0.00";
        Income__Amount.textContent = "0.00";
        Expense__Amount.textContent = "0.00";
        Transaction__list.innerHTML = "";
        saveData();
    });
        });
    }
}

function addInformationToList() {
    let normal__Amount = Amount__Input.value;
    normal__Amount = Number(normal__Amount);
    const decimal__Amount = normal__Amount.toFixed(2);

    const listItem = document.createElement("li");
    listItem.innerHTML = `
                                <div class="list__Item green__border">
        <span class = "list__item__Text">${Description__Input.value}</span>
        <div class="amount__Button__Box">
            <p><span class = "list__item__Amount">${decimal__Amount}</span>$</p>
        <button class = "Delete__Button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        </div>
    </div>
                            
    `;
    const list__Item = listItem.querySelector(".list__Item");

    if(decimal__Amount < 0){
        list__Item.classList.remove("green__border");
        list__Item.classList.add("red__border");
    }

    
    Transaction__list.appendChild(listItem);

    // Update amounts and save
    updateAllAmounts();
    saveData();

    const Delete__Button = listItem.querySelector(".Delete__Button");
    Delete__Button.addEventListener("click",()=>{
        Transaction__list.removeChild(listItem);
        updateAllAmounts();
        saveData();
    });

    Delete__Button__All.addEventListener("click",()=>{
        Current__Balance.textContent = "0.00";
        Income__Amount.textContent = "0.00";
        Expense__Amount.textContent = "0.00";
        Transaction__list.innerHTML = "";
        saveData();
    });

    clearTheInputBoxes();
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadData);