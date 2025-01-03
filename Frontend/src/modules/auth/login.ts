import { showNotification } from '../../main';
export function initAuth() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const email = (document.getElementById('login-email') as HTMLInputElement).value;
        const password = (document.getElementById('login-password') as HTMLInputElement).value;
  
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
  
          if (response.ok) {
            showNotification('Login successful', 'success');
            window.location.href = 'patient.html';
          } else {
            showNotification('Login failed. Please check your credentials and try again.', 'error');
          }
        } catch (error) {
          showNotification('An error occurred. Please try again.', 'error');
        }
      });
    }
  }
