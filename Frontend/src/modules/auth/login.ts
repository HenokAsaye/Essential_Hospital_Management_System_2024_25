import { showNotification } from '../../main';

export function initAuth() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = (document.getElementById('login-email') as HTMLInputElement).value;
      const password = (document.getElementById('login-password') as HTMLInputElement).value;

      try {
        // Send login request to the backend
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies in the request
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
          showNotification('Login successful', 'success');

          // Redirect based on user role
          const userRole = result.data.role;
          if (userRole === 'patient') {
            window.location.href = 'patient.html';
          } else if (userRole === 'doctor') {
            window.location.href = 'doctor.html';
          } else if (userRole === 'admin') {
            window.location.href = 'admin.html';
          } else {
            showNotification('Invalid user role.', 'error');
          }
        } else {
          showNotification(result.message || 'Login failed. Please check your credentials.', 'error');
        }
      } catch (error) {
        showNotification('An error occurred. Please try again.', 'error');
        console.error('Login error:', error);
      }
    });
  }
}
