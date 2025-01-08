import { initAuth } from './modules/auth/login.js';
import { initRegister } from './modules/auth/register.js';
import { initDoctorApproval } from './modules/admin/approval.js';
import { initInviteAdminForm } from './modules/admin/invitations.js';
import { initUserManagement } from './modules/admin/users.js';

export function showNotification(message, type) {
    const notificationContainer = document.createElement('div');
    notificationContainer.classList.add('notification', type);
    notificationContainer.innerText = message;
    document.body.appendChild(notificationContainer);
    setTimeout(() => notificationContainer.remove(), 3000);
}
document.addEventListener('DOMContentLoaded', function() {
    initFormToggling();
    initRegister();  
    initAuth();  
});
function initFormToggling() {
    const showLoginLink = document.getElementById('showLogin');
    const showRegisterLink = document.getElementById('showRegister');
    const registerFormContainer = document.getElementById('auth-forms');
    const loginFormContainer = document.getElementById('login-forms');

    if (showLoginLink && loginFormContainer && registerFormContainer) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            registerFormContainer.style.display = 'none';
            loginFormContainer.style.display = 'block';
        });
    }

    if (showRegisterLink && loginFormContainer && registerFormContainer) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginFormContainer.style.display = 'none';
            registerFormContainer.style.display = 'block';
        });
    }
}

// Separate DOMContentLoaded listener for doctor approval functionality
document.addEventListener('DOMContentLoaded', function () {
    const doctorApprovalLink = document.getElementById('doctor-approval-link');
    const doctorApprovalSection = document.getElementById('doctor-approval-section');
    // Ensure the element exists before attaching event listener
    if (doctorApprovalLink && doctorApprovalSection) {
        doctorApprovalLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default action (link navigation)
            doctorApprovalSection.classList.remove('d-none'); // Show the doctor approval section
            document.getElementById('user-management-section').classList.add('d-none'); // Hide other sections
            document.getElementById('invite-admin-section').classList.add('d-none'); // Hide invite section

            // Initialize doctor approval
            initDoctorApproval(); 
        });
    } else {
        console.error("Doctor approval link or section not found!");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Show User Management section when clicked
    const userManagementLink = document.getElementById('user-management-link');
    const userManagementSection = document.getElementById('user-management-section');

    userManagementLink.addEventListener('click', function (event) {
        event.preventDefault();
        userManagementSection.classList.remove('d-none');
        document.getElementById('doctor-approval-section').classList.add('d-none');
        document.getElementById('invite-admin-section').classList.add('d-none');
        initUserManagement()// Ensure this function exists in users.js
    });

    

    // Show Invite Admin section when clicked
    const inviteAdminLink = document.getElementById('invite-admin-link');
    const inviteAdminSection = document.getElementById('invite-admin-section');

    inviteAdminLink.addEventListener('click', function (event) {
        event.preventDefault();
        inviteAdminSection.classList.remove('d-none');
        document.getElementById('user-management-section').classList.add('d-none');
        document.getElementById('doctor-approval-section').classList.add('d-none');
        initInviteAdminForm() // Ensure this function exists in invitations.js
    });
});
