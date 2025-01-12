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
document.addEventListener("DOMContentLoaded", () => {
    initFormToggling();
    initRegister();
    initAuth();
    initDoctorRequest();

    const doctorApprovalLink = document.getElementById("doctor-approval-link");
    const doctorApprovalSection = document.getElementById("doctor-approval-section");

    if (!doctorApprovalLink || !doctorApprovalSection) {
        console.error("Doctor approval link or section not found!");
        return;
    }
    doctorApprovalLink.addEventListener("click", (e) => {
        e.preventDefault();
        showSection("doctor-approval-section");
        initDoctorApproval(); // Ensure this is called when the section is shown
    });
    const userManagementLink = document.getElementById('user-management-link');
    const userManagementSection = document.getElementById('user-management-section');
    if (userManagementLink && userManagementSection) {
        userManagementLink.addEventListener('click', function (event) {
            event.preventDefault();
            userManagementSection.classList.remove('d-none');
            doctorApprovalSection?.classList.add('d-none');
            inviteAdminSection?.classList.add('d-none');
            initUserManagement();
        });
    }

    const inviteAdminLink = document.getElementById('invite-admin-link');
    const inviteAdminSection = document.getElementById('invite-admin-section');
    if (inviteAdminLink && inviteAdminSection) {
        inviteAdminLink.addEventListener('click', function (event) {
            event.preventDefault();
            inviteAdminSection.classList.remove('d-none');
            userManagementSection?.classList.add('d-none');
            doctorApprovalSection?.classList.add('d-none');
            initInviteAdminForm();
        });
    }

    function showSection(sectionId) {
        document.querySelectorAll(".admin-section").forEach((section) => {
            section.classList.add("d-none");
        });
        document.getElementById(sectionId).classList.remove("d-none");
    }
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
