import { showNotification } from '../../main';

export function initRegister() {
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = (document.getElementById('name') as HTMLInputElement).value;
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;

      if (!name || !email || !password) {
        showNotification('Please fill in all fields.', 'error');
        return;
      }

      try {
        const response = await fetch('/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',  
          body: JSON.stringify({ name, email, password }),
        });

        const result = await response.json();
        if (response.ok) {
          showNotification(result.message || 'Registration successful', 'success');
          window.location.href = 'index.html';
        } else {
          showNotification(result.message || 'Registration failed. Please try again.', 'error');
        }
      } catch (error) {
        showNotification('An error occurred. Please try again.', 'error');
      }
    });
  }
}
