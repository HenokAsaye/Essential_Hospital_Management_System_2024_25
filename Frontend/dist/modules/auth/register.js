import { showNotification } from "../../main.js";
import { navigateToPage } from '../../router.js';

export function initRegister() {
    console.log('Register function triggered');  
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        console.log('Register form found');  
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log('Form submission triggered');  
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            const age = parseInt(document.getElementById('age').value);  
            const contact = document.getElementById('contact').value;
            const gender = document.getElementById('gender').value;

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
                console.log('Response Status:', response.status);  
                const result = await response.json();
                console.log('Response Body:', result);  

                if (response.ok) {
                    const role = result.data.role.toLowerCase();  
                    console.log('Navigating to role:', role);  
                    showNotification(result.message || 'Registration successful', 'success');
                    navigateToPage(role);
                } else {
                    showNotification(result.message || 'Registration failed. Please try again.', 'error');
                }
            } catch (error) {
                showNotification('An error occurred. Please try again.', 'error');
                console.error(error);  
            }
        });
    } else {
        console.log('Register form not found'); 
    }
}
