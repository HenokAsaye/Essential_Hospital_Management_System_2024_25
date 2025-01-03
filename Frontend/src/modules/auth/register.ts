import { showNotification } from '../../main';
export function initRegister() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
          });
  
          if (response.ok) {
            showNotification('Registration successful', 'success');
            window.location.href = 'index.html';
          } else {
            showNotification('Registration failed. Please try again.', 'error');
          }
        } catch (error) {
          showNotification('An error occurred. Please try again.', 'error');
        }
      });
    }
  }
