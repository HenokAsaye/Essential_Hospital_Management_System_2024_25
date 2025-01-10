import { getData, putData, deleteData } from '../../utility/api-helper.js';

export function displayUsers() {
    getData('/admin/users')
        .then((users) => {
            const usersTable = document.getElementById('users-table').getElementsByTagName('tbody')[0];
            usersTable.innerHTML = '';
            users.forEach((user) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>
                        <button class="btn btn-warning update-btn" data-id="${user.id}">Update</button>
                        <button class="btn btn-danger delete-btn" data-id="${user.id}">Delete</button>
                    </td>
                `;
                usersTable.appendChild(row);
            });
            
            addEventListenersToButtons();
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
        });
}
function addEventListenersToButtons() {
    document.querySelectorAll('.update-btn').forEach((button) => {
        button.addEventListener('click', () => {
            console.log('Update button clicked');
            showUpdateForm(button.getAttribute('data-id')); 
        });
    });
    document.querySelectorAll('.delete-btn').forEach((button) => {
        button.addEventListener('click', () => deleteUser(button.getAttribute('data-id')));
    });
}
export function showUpdateForm(userId) {
    const form = document.getElementById('update-form');
    const nameInput = document.getElementById('update-name');
    const emailInput = document.getElementById('update-email');
    const ageInput = document.getElementById('update-age');
    const contactInput = document.getElementById('update-contact');
    const roleInput = document.getElementById('update-role');
    const saveButton = document.getElementById('save-button');
    if (!form || !nameInput || !emailInput || !ageInput || !contactInput || !roleInput || !saveButton) {
        console.error('One or more required elements are missing!');
        return;
    }
    form.classList.remove('d-none');
    form.style.visibility = 'visible';
    form.style.opacity = '1'; 
    saveButton.onclick = () => {
        const updatedUser = {
            userId: Number(userId), 
            name: nameInput.value,
            role: roleInput.value,
            age: parseInt(ageInput.value) || undefined,
            contact: contactInput.value || undefined,
        };
        putData(`/admin/updateuser`, updatedUser)
            .then(() => {
                displayUsers(); 
                form.classList.add('d-none'); 
            })
            .catch((error) => {
                console.error('Error updating user:', error);
            });
    };
    form.addEventListener('click', (e) => {
        if (e.target === form) { 
            form.classList.add('d-none'); 
        }
    });
}
document.addEventListener('DOMContentLoaded', addEventListenersToButtons);

export function deleteUser(userId) {
    deleteData(`/admin/deleteuser`, { userId: Number(userId) })  
        .then(() => {
            displayUsers();
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
        });
}
export function initUserManagement() {
    displayUsers();
}
