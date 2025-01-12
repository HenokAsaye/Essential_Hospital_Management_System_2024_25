import { showNotification } from '../../main';
import { navigateToPage } from '../../router';

export function initRegister() {
   console.log('Register function triggered');
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = (document.getElementById('name') as HTMLInputElement).value;
      const email = (document.getElementById('email') as HTMLInputElement)
        .value;
      const password = (document.getElementById('password') as HTMLInputElement)
        .value;
      const role = (document.getElementById('role') as HTMLSelectElement).value;

      const age = (document.getElementById('age') as HTMLInputElement).value;
      const contact = (document.getElementById('contact') as HTMLInputElement)
        .value;
      const gender = (document.getElementById('gender') as HTMLSelectElement)
        .value;

      if (!name || !email || !password || !role || !contact || !gender) {
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
          body: JSON.stringify({
            name,
            email,
            password,
            role,
            age,
            contact,
            gender,
          }),
        });

        const result = await response.json();
        console.log(result.user.role);
        if (response.ok) {
          showNotification(
            result.message || 'Registration successful',
            'success',
          );
          navigateToPage(role); // Navigate to the role-based page
        } else {
          showNotification(
            result.message || 'Registration failed. Please try again.',
            'error',
          );
        }
      } catch (error) {
        showNotification('An error occurred. Please try again.', 'error');
      }
    });
  }
}
