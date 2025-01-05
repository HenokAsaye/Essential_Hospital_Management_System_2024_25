import { initAuth } from './modules/auth/login';
import { initRegister } from './modules/auth/register';



export function showNotification(message: string, type: 'success' | 'error') {
  const notificationContainer = document.createElement('div');
  notificationContainer.classList.add('notification', type);
  notificationContainer.innerText = message;
  document.body.appendChild(notificationContainer);
  setTimeout(() => notificationContainer.remove(), 3000);
}
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

  
  initRegister();
  initAuth();
}
