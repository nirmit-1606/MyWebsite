let employees = [];
let employeeId = 1;

window.onload = () => {
    const savedEmployees = localStorage.getItem('employees');
    if(savedEmployees) {
        employees = JSON.parse(savedEmployees);
        if(employees.length > 0){
            employeeId = Math.max(...employees.map(emp => emp.id)) + 1;
            // employeeId = employees.length + 1;
        }
        updateTable();
    }
};

function toggleForm() {
    document.getElementById('formContainer').classList.toggle('hidden');
}

function addEmployee() {
    const name = document.getElementById('empName').value;
    const address = document.getElementById('empAddress').value;

    if (!name || !address){
        alert('Please enter both name and address.');
        return;
    }

    const newEmployee = {
        id: employeeId++,
        name,
        address
    };

    employees.push(newEmployee);
    saveToLocalStorage();
    updateTable();
    clearForm();
    toggleForm();
}

function updateTable() {
    const tbody = document.querySelector('#employeeTable tbody');
    tbody.innerHTML = '';

    employees.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.address}</td>
            <td><button onclick = "deleteEmployee(${emp.id})">Delete</button></td>
        `;
        tbody.appendChild(row);
    });
}

function deleteEmployee(id) {
    employees = employees.filter(emp => emp.id !== id);
    saveToLocalStorage();
    updateTable();
}

function clearAll() {
    if(confirm('Are you sure you want to clear all emploiyee data?')) {
        employees = [];
        employeeId = 1;
        localStorage.removeItem('employees');
        updateTable();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(employees));
}

function clearForm() {
    document.getElementById('empName').value = '';
    document.getElementById('empAddress').value = '';
}
