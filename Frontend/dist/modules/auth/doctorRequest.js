import { showNotification } from '../../main.js';
import { postData } from '../../utility/api-helper.js';

export function initDoctorRequest() {
  console.log('Doctor Registration Request Initialized');
  const doctorRegistrationForm = document.getElementById('doctorRegistrationForm');

  if (doctorRegistrationForm) {
    doctorRegistrationForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      console.log('Doctor registration form submitted');

      try {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact').value.trim();
        const password = document.getElementById('password').value.trim();
        const ageValue = document.getElementById('age').value.trim();
        const gender = document.getElementById('gender').value;

        const age = ageValue ? parseInt(ageValue, 10) : undefined;

        if (!name || !email || !contact || !password || isNaN(age) || !gender) {
          showNotification('Please fill in all required fields.', 'error');
          return;
        }

        if (age < 18) {
          showNotification('Age must be 18 or above.', 'error');
          return;
        }

        const response = await postData('/auth/signupdoctor', {
          name,
          email,
          contact,
          password,
          age: age || null,
          gender: gender || null,
          role: 'Doctor',
        });

        console.log('Doctor Registration Response:', response);
        if (response && response.success) {
          showNotification('Your registration request was submitted successfully.', 'success');

          // Log before resetting the form
          console.log('Resetting form...');

          // Manually reset the form fields
          doctorRegistrationForm.querySelector('#name').value = '';
          doctorRegistrationForm.querySelector('#email').value = '';
          doctorRegistrationForm.querySelector('#contact').value = '';
          doctorRegistrationForm.querySelector('#password').value = '';
          doctorRegistrationForm.querySelector('#age').value = '';
          doctorRegistrationForm.querySelector('#gender').selectedIndex = 0; // Reset dropdown

          console.log('Form fields have been manually reset.');

        } else {
          showNotification(response.message || 'Failed to submit the registration request.', 'error');
        }
      } catch (error) {
        console.error('Error submitting doctor registration request:', error);

        if (error.message.includes('already exists')) {
          showNotification('A user with this email already exists. Please try with a different email.', 'error');
        } else {
          showNotification('An error occurred. Please try again later.', 'error');
        }
      }
    });
  }
}
