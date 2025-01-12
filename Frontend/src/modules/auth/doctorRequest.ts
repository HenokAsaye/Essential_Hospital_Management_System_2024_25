import { showNotification } from '../../main';
import { postData } from '../../utility/api-helper';

export function initDoctorRequest() {
    console.log('Doctor Registration Request Initialized');
    const doctorRegistrationForm = document.getElementById('doctorRegistrationForm') as HTMLFormElement;

    if (doctorRegistrationForm) {
        doctorRegistrationForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log('Doctor registration form submitted');

            // Extracting form field values
            const name = (document.getElementById('name') as HTMLInputElement).value.trim();
            const email = (document.getElementById('email') as HTMLInputElement).value.trim();
            const contact = (document.getElementById('contact') as HTMLInputElement).value.trim();
            const password = (document.getElementById('password') as HTMLInputElement).value.trim();
            const age = parseInt((document.getElementById('age') as HTMLInputElement).value.trim(), 10);
            const gender = (document.getElementById('gender') as HTMLSelectElement).value;

            // Basic validation
            if (!name || !email || !contact || !password || isNaN(age) || !gender) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            if (age < 18) {
                showNotification('Age must be 18 or above.', 'error');
                return;
            }

            try {
                // Sending data to the server
                const response = await postData('/doctor/register', {
                    name,
                    email,
                    contact,
                    password,
                    age,
                    gender,
                });

                console.log('Doctor Registration Response:', response);
                clearFormFields();


            } catch (error) {
                console.error('Error submitting doctor registration request:', error);
                showNotification('An error occurred. Please try again later.', 'error');
            }
        });
    } else {
        console.error('Doctor registration form not found');
    }
}
function clearFormFields() {
    (document.getElementById('name') as HTMLInputElement).value = '';
    (document.getElementById('email') as HTMLInputElement).value = '';
    (document.getElementById('contact') as HTMLInputElement).value = '';
    (document.getElementById('password') as HTMLInputElement).value = '';
    (document.getElementById('age') as HTMLInputElement).value = '';
    (document.getElementById('gender') as HTMLSelectElement).value = '';
}
