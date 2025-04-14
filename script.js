class EmployeeDirectory {
    constructor() {
        this.employees = [];
        this.employeeId = 1;
        this.currentlyEditingId = null;

        this.tableBody = document.querySelector('#employeeTable tbody');
        this.overlay = document.getElementById('overlayForm');
        this.toast = document.getElementById('toast');

        this.loadFromLocalStorage();
        this.updateTable();
    }

    loadFromLocalStorage() {
        const savedEmployees = localStorage.getItem('employees');
        if (savedEmployees) {
            this.employees = JSON.parse(savedEmployees);
            if (this.employees.length > 0) {
                this.employeeId = Math.max(...this.employees.map(emp => emp.id)) + 1;
            }
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('employees', JSON.stringify(this.employees));
    }

    toggleForm(show) {
        this.overlay.classList.toggle('hidden', !show);
        if (!show) this.clearForm();
    }

    clearForm() {
        document.getElementById('empName').value = '';
        document.getElementById('empAddress').value = '';
    }

    showToast(message) {
        this.toast.textContent = message;
        this.toast.classList.add('show');
        setTimeout(() => this.toast.classList.remove('show'), 3000);
    }

    addEmployee() {
        const name = document.getElementById('empName').value;
        const address = document.getElementById('empAddress').value;

        if (!name || !address) {
            this.showToast('Please enter both name and address.');
            return;
        }

        const newEmployee = {
            id: this.employeeId++,
            name,
            address
        };

        this.employees.push(newEmployee);
        this.saveToLocalStorage();
        this.updateTable();
        this.clearForm();
        this.toggleForm(false);
        this.showToast('Employee added successfully!');
    }

    editEmployee(id) {
        this.currentlyEditingId = id;
        this.updateTable();
    }

    updateEmployee(id) {
        const name = document.getElementById(`editName${id}`).value;
        const address = document.getElementById(`editAddress${id}`).value;

        if (!name || !address) {
            this.showToast('Please fill in all fields.');
            return;
        }

        const index = this.employees.findIndex(emp => emp.id === id);
        this.employees[index].name = name;
        this.employees[index].address = address;

        this.currentlyEditingId = null;
        this.saveToLocalStorage();
        this.updateTable();
        this.showToast('Employee updated successfully!')
    }

    cancelEdit() {
        this.currentlyEditingId = null;
        this.updateTable();
    }

    deleteEmployee(id) {
        this.employees = this.employees.filter(emp => emp.id !== id);
        this.saveToLocalStorage();
        this.updateTable();
        this.showToast('Employee deleted.');
    }

    clearAll() {
        if (confirm('Are you sure you want to clear all emploiyee data?')) {
            this.employees = [];
            this.employeeId = 1;
            this.currentlyEditingId = null;
            localStorage.removeItem('employees');
            this.updateTable();
            this.showToast('All emoliyee data cleared.');
        }
    }

    updateTable() {
        this.tableBody.innerHTML = '';

        this.employees.forEach(emp => {
            const row = document.createElement('tr');
            row.className = (emp.id === this.currentlyEditingId) ? 'editing-row' : '';

            if (emp.id === this.currentlyEditingId) {
                row.innerHTML = `
                    <td>${emp.id}</td>
                    <td><input type="text" id="editName${emp.id}" value=${emp.name} placeholder="Name"></td>
                    <td><input type="text" id="editAddress${emp.id}" value=${emp.address} placeholder="Address"></td>
                    <td>
                        <button onclick = "directory.updateEmployee(${emp.id})" class="update">Update</button>
                        <button onclick = "directory.cancelEdit()" class="cancel">Cancel</button>
                    </td>
                `;
            } else {
                row.innerHTML = `
                    <td>${emp.id}</td>
                    <td>${emp.name}</td>
                    <td>${emp.address}</td>
                    <td>
                        <button onclick = "directory.editEmployee(${emp.id})" class="edit">Edit</button>
                        <button onclick = "directory.deleteEmployee(${emp.id})" class="delete">Delete</button>
                    </td>
                `;
            }
            this.tableBody.appendChild(row);
        });
    }
}

const directory = new EmployeeDirectory();

function toggleForm(show) {
    directory.toggleForm(show);
}

function addEmployee() {
    directory.addEmployee();
}

function clearAll() {
    directory.clearAll();
}
