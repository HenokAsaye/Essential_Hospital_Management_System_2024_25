"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayUsers = displayUsers;
exports.showUpdateForm = showUpdateForm;
exports.deleteUser = deleteUser;
exports.initUserManagement = initUserManagement;
var api_helper_1 = require("../../utility/api-helper");
// Function to display all users
function displayUsers() {
    (0, api_helper_1.getData)('/users') // Correct endpoint to fetch all users
        .then(function (users) {
        var usersTable = document.getElementById('users-table');
        usersTable.innerHTML = ''; // Clear the table
        // Add each user to the table
        users.forEach(function (user) {
            var row = document.createElement('tr');
            row.innerHTML = "\n          <td>".concat(user.name, "</td>\n          <td>").concat(user.email, "</td>\n          <td>").concat(user.role, "</td>\n          <td>\n            <button class=\"btn btn-warning\" onclick=\"showUpdateForm(").concat(user.id, ")\">Update</button>\n            <button class=\"btn btn-danger\" onclick=\"deleteUser(").concat(user.id, ")\">Delete</button>\n          </td>\n        ");
            usersTable.appendChild(row);
        });
    })
        .catch(function (error) {
        console.error('Error fetching users:', error);
    });
}
// Function to show the update form with user details
function showUpdateForm(userId) {
    var form = document.getElementById('update-form');
    var nameInput = document.getElementById('update-name');
    var emailInput = document.getElementById('update-email');
    var ageInput = document.getElementById('update-age'); // Added for age
    var contactInput = document.getElementById('update-contact'); // Added for contact
    var roleInput = document.getElementById('update-role');
    // Fetch the user details for the selected user
    (0, api_helper_1.getData)('/users')
        .then(function (users) {
        var _a;
        var user = users.find(function (u) { return u.id === userId; });
        if (user) {
            nameInput.value = user.name;
            emailInput.value = user.email;
            ageInput.value = user.age || '';
            contactInput.value = user.contact || '';
            roleInput.value = user.role;
            // Show the update form
            form.style.display = 'block';
            // Handle the save action
            (_a = document
                .getElementById('save-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                var updatedUser = {
                    userId: user.id, // Correct field name according to DTO
                    name: nameInput.value,
                    email: emailInput.value,
                    age: parseInt(ageInput.value) || undefined, // Set age only if provided
                    contact: contactInput.value || undefined, // Set contact only if provided
                    role: roleInput.value,
                };
                (0, api_helper_1.putData)("/users/".concat(user.id), updatedUser) // Correct API endpoint for update
                    .then(function () {
                    // Refresh the users list after update
                    displayUsers();
                    // Hide the update form
                    form.style.display = 'none';
                })
                    .catch(function (error) {
                    console.error('Error updating user:', error);
                });
            });
        }
    })
        .catch(function (error) {
        console.error('Error fetching user details:', error);
    });
}
// Function to delete a user
function deleteUser(userId) {
    (0, api_helper_1.deleteData)("/users/".concat(userId))
        .then(function () {
        displayUsers();
    })
        .catch(function (error) {
        console.error('Error deleting user:', error);
    });
}
// Function to initialize the user management section
function initUserManagement() {
    displayUsers();
}
