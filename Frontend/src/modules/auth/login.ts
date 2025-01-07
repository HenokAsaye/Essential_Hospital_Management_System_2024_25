import { showNotification } from '../../main';
import { navigateToPage } from '../../router';

export function initAuth() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = (document.getElementById('login-email') as HTMLInputElement)
        .value;
      const password = (
        document.getElementById('login-password') as HTMLInputElement
      ).value;

      if (!email || !password) {
        showNotification('Please fill in all fields.', 'error');
        return;
      }

      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (response.ok) {
          showNotification(result.message || 'Login successful', 'success');
          navigateToPage(result.user.role); // Navigate based on role
        } else {
          showNotification(
            result.message || 'Login failed. Please try again.',
            'error',
          );
        }
      } catch (error) {
        showNotification('An error occurred. Please try again.', 'error');
      }
    });
  }
}
