import { initAuth } from './modules/auth/login';
import { initRegister } from './modules/auth/register';
import { initDoctorApproval } from './modules/admin/approval';
import { initInviteAdminForm } from './modules/admin/invitations';
import { initUserManagement } from './modules/admin/users';
import { initDoctorRequest } from './modules/auth/doctorRequest'; 

export function showNotification(message: string, type: 'success' | 'error') {
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

// Function for toggling forms between login and register
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
      document.getElementById('user-management-section')?.classList.add('d-none'); // Hide other sections
      document.getElementById('invite-admin-section')?.classList.add('d-none'); // Hide invite section

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
      event.preventDefault();
      userManagementSection.classList.remove('d-none');
      document.getElementById('doctor-approval-section')?.classList.add('d-none');
      document.getElementById('invite-admin-section')?.classList.add('d-none');
      initUserManagement(); // Ensure this function exists in users.ts
    });
  }

  // Event listener to manage Invite Admin section
  const inviteAdminLink = document.getElementById('invite-admin-link');
  const inviteAdminSection = document.getElementById('invite-admin-section');


  if (inviteAdminLink && inviteAdminSection) {
    inviteAdminLink.addEventListener('click', function (event) {
      event.preventDefault();
      inviteAdminSection.classList.remove('d-none');
      document.getElementById('user-management-section')?.classList.add('d-none');
      document.getElementById('doctor-approval-section')?.classList.add('d-none');
      initInviteAdminForm(); // Ensure this function exists in invitations.ts
    });
  }
});
