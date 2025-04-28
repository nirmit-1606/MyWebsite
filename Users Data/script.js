const loadUsersBtn = document.getElementById('loadUsersBtn');
const userList = document.getElementById('userList');

// using async await
loadUsersBtn.addEventListener('click', async () => {
    console.log('Before fetching users...');
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        console.log('Users fetched successfully.');

        userList.innerHTML = '';

        users.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${user.name}</strong><br>Email: ${user.email}<br>Company: ${user.company.name}`;
            userList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
    console.log('After fetching users.');
});

// using .then
// loadUsersBtn.addEventListener('click', () => {
//     console.log('Before fetching users...');

//     fetch('https://jsonplaceholder.typicode.com/users')
//         .then(response => {
//             return response.json();
//         })
//         .then(users => {
//             console.log('Users fetched successfully.');

//             userList.innerHTML = '';

//             users.forEach(user => {
//                 const li = document.createElement('li');
//                 li.innerHTML = `<strong>${user.name}</strong><br>Email: ${user.email}<br>Company: ${user.company.name}`;
//                 userList.appendChild(li);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching users:', error);
//         });

//     console.log('After starting fetch.');
// });

console.log('Page load complete');
