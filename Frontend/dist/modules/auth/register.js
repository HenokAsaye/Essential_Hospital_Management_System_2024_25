var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { showNotification } from '../../main.js';
import { navigateToPage } from '../../router.js';
export function initRegister() {
    console.log('Register function triggered');
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email')
                .value;
            const password = document.getElementById('password')
                .value;
            const role = document.getElementById('role').value;
            const age = document.getElementById('age').value;
            const contact = document.getElementById('contact')
                .value;
            const gender = document.getElementById('gender')
                .value;
            if (!name || !email || !password || !role || !contact || !gender) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            try {
                const response = yield fetch('/auth/signup', {
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
                const result = yield response.json();
                console.log(result.user.role);
                if (response.ok) {
                    showNotification(result.message || 'Registration successful', 'success');
                    navigateToPage(role); 
                }
                else {
                    showNotification(result.message || 'Registration failed. Please try again.', 'error');
                }
            }
            catch (error) {
                showNotification('An error occurred. Please try again.', 'error');
            }
        }));
    }
}
