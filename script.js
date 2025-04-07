let employees = [];
let employeeId = 1;

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
    updateTable();
    clearForm();
    toggleForm();
}

function updateTable() {
    const tbody = document.querySelector('#employeeTable tbody');
    tbody.innerHTML = '';

    employees.forEach(emp => {
        const row = `<tr><td>${emp.id}</td><td>${emp.name}</td><td>${emp.address}</td></tr>`;
        tbody.innerHTML += row;
    });
}

function clearForm() {
    document.getElementById('empName').value = '';
    document.getElementById('empAddress').value = '';
}
