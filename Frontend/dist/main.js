import { initAuth } from './modules/auth/login.js';
import { initRegister } from './modules/auth/register.js';
import { initDoctorApproval } from './modules/admin/approval.js';
import { initInviteAdminForm } from './modules/admin/invitations.js';
import { initUserManagement } from './modules/admin/users.js';
import { initDoctorRequest } from './modules/auth/doctorRequest.js';
export function showNotification(message, type) {
    const notificationContainer = document.createElement('div');
    notificationContainer.classList.add('notification', type);
    notificationContainer.innerText = message;
    document.body.appendChild(notificationContainer);
    setTimeout(() => notificationContainer.remove(), 3000);
}
document.addEventListener('DOMContentLoaded', function () {
    initFormToggling();
    initRegister();
    initAuth();
    initDoctorRequest(); // Initialize doctor request functionality
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


// Event listener to manage User Management section
document.addEventListener('DOMContentLoaded', function () {
    const userManagementLink = document.getElementById('user-management-link');
    const userManagementSection = document.getElementById('user-management-section');
    if (userManagementLink && userManagementSection) {
        userManagementLink.addEventListener('click', function (event) {
            var _a, _b;
            event.preventDefault();
            userManagementSection.classList.remove('d-none');
            (_a = document.getElementById('doctor-approval-section')) === null || _a === void 0 ? void 0 : _a.classList.add('d-none');
            (_b = document.getElementById('invite-admin-section')) === null || _b === void 0 ? void 0 : _b.classList.add('d-none');
            initUserManagement(); // Ensure this function exists in users.ts
        });
    }
    const inviteAdminLink = document.getElementById('invite-admin-link');

    const inviteAdminSection = document.getElementById('invite-admin-section');
    if (inviteAdminLink && inviteAdminSection) {
        inviteAdminLink.addEventListener('click', function (event) {
            var _a, _b;
            event.preventDefault();
            inviteAdminSection.classList.remove('d-none');
            (_a = document.getElementById('user-management-section')) === null || _a === void 0 ? void 0 : _a.classList.add('d-none');
            (_b = document.getElementById('doctor-approval-section')) === null || _b === void 0 ? void 0 : _b.classList.add('d-none');
            initInviteAdminForm(); //
        });
    }
});
