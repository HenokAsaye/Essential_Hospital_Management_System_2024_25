import { getData, putData, deleteData } from '../../utility/api-helper';

// User interface definition
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  contact?: string;
  role: string;
}

// Function to display all users
export function displayUsers() {
  getData('/users') // Correct endpoint to fetch all users
    .then((users) => {
      const usersTable = document.getElementById('users-table') as HTMLElement;
      usersTable.innerHTML = ''; // Clear the table

      // Add each user to the table
      users.forEach((user: User) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>
            <button class="btn btn-warning" onclick="showUpdateForm(${user.id})">Update</button>
            <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
          </td>
        `;
        usersTable.appendChild(row);
      });
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
    });
}

// Function to show the update form with user details
export function showUpdateForm(userId: number) {
  const form = document.getElementById('update-form') as HTMLElement;
  const nameInput = document.getElementById('update-name') as HTMLInputElement;
  const emailInput = document.getElementById(
    'update-email',
  ) as HTMLInputElement;
  const ageInput = document.getElementById('update-age') as HTMLInputElement; // Added for age
  const contactInput = document.getElementById(
    'update-contact',
  ) as HTMLInputElement; // Added for contact
  const roleInput = document.getElementById('update-role') as HTMLSelectElement;

  // Fetch the user details for the selected user
  getData('/users') 
    .then((users) => {
      const user: User | undefined = users.find((u: User) => u.id === userId);
      if (user) {
        nameInput.value = user.name;
        emailInput.value = user.email;
        ageInput.value = user.age !== undefined ? user.age.toString() : '';
        contactInput.value = user.contact || ''; 
        roleInput.value = user.role;

        // Show the update form
        form.style.display = 'block';

        // Handle the save action
        document
          .getElementById('save-button')
          ?.addEventListener('click', () => {
            const updatedUser = {
              userId: user.id, // Correct field name according to DTO
              name: nameInput.value,
              email: emailInput.value,
              age: parseInt(ageInput.value) || undefined, // Set age only if provided
              contact: contactInput.value || undefined, // Set contact only if provided
              role: roleInput.value,
            };
            putData(`/users/${user.id}`, updatedUser) // Correct API endpoint for update
              .then(() => {
                // Refresh the users list after update
                displayUsers();
                // Hide the update form
                form.style.display = 'none';
              })
              .catch((error) => {
                console.error('Error updating user:', error);
              });
          });
      }
    })
    .catch((error) => {
      console.error('Error fetching user details:', error);
    });
}

// Function to delete a user
export function deleteUser(userId: number) {
  deleteData(`/users/${userId}`) 
    .then(() => {
      
      displayUsers();
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
    });
}

// Function to initialize the user management section
export function initUserManagement() {
  displayUsers();
}
