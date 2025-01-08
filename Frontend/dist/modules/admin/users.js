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

// This function sets up event listeners for the update and delete buttons
function addEventListenersToButtons() {
    // Event listener for update buttons
    document.querySelectorAll('.update-btn').forEach((button) => {
        button.addEventListener('click', () => {
            console.log('Update button clicked');
            showUpdateForm(button.getAttribute('data-id')); // Pass the userId from the button's data-id attribute
        });
    });

    // Event listener for delete buttons (if needed)
    document.querySelectorAll('.delete-btn').forEach((button) => {
        button.addEventListener('click', () => deleteUser(button.getAttribute('data-id')));
    });
}

// This function displays the update form and populates it with the user's data
export function showUpdateForm(userId) {
    const form = document.getElementById('update-form');
    const nameInput = document.getElementById('update-name');
    const emailInput = document.getElementById('update-email');
    const ageInput = document.getElementById('update-age');
    const contactInput = document.getElementById('update-contact');
    const roleInput = document.getElementById('update-role');
    const saveButton = document.getElementById('save-button');

    // Ensure all the elements are available before proceeding
    if (!form || !nameInput || !emailInput || !ageInput || !contactInput || !roleInput || !saveButton) {
        console.error('One or more required elements are missing!');
        return;
    }

    // Show the form with the overlay
    form.classList.remove('d-none');
    form.style.visibility = 'visible';
    form.style.opacity = '1'; // Smooth fade-in effect

    // Optional: clear the form fields to start fresh (you can comment this out if not needed)
    // nameInput.value = '';
    // emailInput.value = '';
    // ageInput.value = '';
    // contactInput.value = '';
    // roleInput.value = '';
    // genderInput.value = ''

    // Attach the save/update event for the form
    saveButton.onclick = () => {
        const updatedUser = {
            userId: Number(userId), // Ensure userId is passed correctly
            name: nameInput.value,
            role: roleInput.value,
            age: parseInt(ageInput.value) || undefined,
            contact: contactInput.value || undefined,
        };

        // Send the update request to the server
        putData(`/admin/updateuser`, updatedUser)
            .then(() => {
                displayUsers(); // Refresh the user list
                form.classList.add('d-none'); // Hide the form after saving
            })
            .catch((error) => {
                console.error('Error updating user:', error);
            });
    };

    // Close the form when clicked outside the form
    form.addEventListener('click', (e) => {
        if (e.target === form) { // If the click is outside the modal card
            form.classList.add('d-none'); // Hide the form
        }
    });
}

// Call addEventListenersToButtons when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', addEventListenersToButtons);

export function deleteUser(userId) {
    deleteData(`/admin/deleteuser`, { userId: Number(userId) })  // Explicitly ensure it's a number
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
