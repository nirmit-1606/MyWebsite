let employees = [];
let employeeId = 1;
let currentlyEditingId = null;

window.onload = () => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
        employees = JSON.parse(savedEmployees);
        if (employees.length > 0) {
            employeeId = Math.max(...employees.map(emp => emp.id)) + 1;
            // employeeId = employees.length + 1;
        }
        updateTable();
    }
};

function toggleForm(show) {
    document.getElementById('overlayForm').classList.toggle('hidden', !show);
    if (!show) clearForm();
}

function addEmployee() {
    const name = document.getElementById('empName').value;
    const address = document.getElementById('empAddress').value;

    if (!name || !address) {
        showToast('Please enter both name and address.');
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
    toggleForm(false);
    showToast('Employee added successfully!');
}

function updateTable() {
    const tbody = document.querySelector('#employeeTable tbody');
    tbody.innerHTML = '';

    employees.forEach(emp => {
        const row = document.createElement('tr');
        row.className = (emp.id === currentlyEditingId) ? 'editing-row' : '';

        if (emp.id === currentlyEditingId) {
            row.innerHTML = `
                <td>${emp.id}</td>
                <td><input type="text" id="editName${emp.id}" placeholder="Name" value=${emp.name}></td>
                <td><input type="text" id="editAddress${emp.id}" placeholder="Address" value=${emp.address}></td>
                <td>
                    <button onclick = "updateEmployee(${emp.id})" class="update">Update</button>
                    <button onclick = "cancelEdit()" class="cancel">Cancel</button>
                </td>
            `;
        } else {
            row.innerHTML = `
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.address}</td>
                <td>
                    <button onclick = "editEmployee(${emp.id})" class="edit">Edit</button>
                    <button onclick = "deleteEmployee(${emp.id})" class="delete">Delete</button>
                </td>
            `;
        }
        tbody.appendChild(row);
    });
}

function editEmployee(id) {
    currentlyEditingId = id;
    updateTable();
}

function updateEmployee(id) {
    console.log("update Employee function");
    const name = document.getElementById(`editName${id}`).value;
    const address = document.getElementById(`editAddress${id}`).value;

    if (!name || !address) {
        showToast('Please fill in all fields.');
        return;
    }

    const index = employees.findIndex(emp => emp.id === id);
    employees[index].name = name;
    employees[index].address = address;

    currentlyEditingId = null;
    saveToLocalStorage();
    updateTable();
    showToast('Employee updated successfully!')
}

function cancelEdit() {
    currentlyEditingId = null;
    updateTable();
}

function deleteEmployee(id) {
    employees = employees.filter(emp => emp.id !== id);
    saveToLocalStorage();
    updateTable();
    showToast('Employee deleted.');
}

function clearAll() {
    if (confirm('Are you sure you want to clear all emploiyee data?')) {
        employees = [];
        employeeId = 1;
        currentlyEditingId = null;
        localStorage.removeItem('employees');
        updateTable();
        showToast('All emoliyee data cleared.');
    }
}

function saveToLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(employees));
}

function clearForm() {
    document.getElementById('empName').value = '';
    document.getElementById('empAddress').value = '';
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
