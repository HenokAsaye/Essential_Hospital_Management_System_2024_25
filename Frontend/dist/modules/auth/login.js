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
export function initAuth() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const email = document.getElementById('login-email')
                .value;
            const password = document.getElementById('login-password').value;
            if (!email || !password) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            try {
                const response = yield fetch('/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ email, password }),
                });
                const result = yield response.json();
                if (response.ok) {
                    showNotification(result.message || 'Login successful', 'success');
                    navigateToPage(result.user.role); // Navigate based on role
                }
                else {
                    showNotification(result.message || 'Login failed. Please try again.', 'error');
                }
            }
            catch (error) {
                showNotification('An error occurred. Please try again.', 'error');
            }
        }));
    }
}
