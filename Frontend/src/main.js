"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showNotification = showNotification;
var login_1 = require("./modules/auth/login");
var register_1 = require("./modules/auth/register");
function showNotification(message, type) {
    var notificationContainer = document.createElement('div');
    notificationContainer.classList.add('notification', type);
    notificationContainer.innerText = message;
    document.body.appendChild(notificationContainer);
    setTimeout(function () { return notificationContainer.remove(); }, 3000);
}
function initFormToggling() {
    var showLoginLink = document.getElementById('showLogin');
    var showRegisterLink = document.getElementById('showRegister');
    var registerFormContainer = document.getElementById('auth-forms');
    var loginFormContainer = document.getElementById('login-forms');
    if (showLoginLink && loginFormContainer && registerFormContainer) {
        showLoginLink.addEventListener('click', function (e) {
            e.preventDefault();
            registerFormContainer.style.display = 'none';
            loginFormContainer.style.display = 'block';
        });
    }
    if (showRegisterLink && loginFormContainer && registerFormContainer) {
        showRegisterLink.addEventListener('click', function (e) {
            e.preventDefault();
            loginFormContainer.style.display = 'none';
            registerFormContainer.style.display = 'block';
        });
    }
    (0, register_1.initRegister)();
    (0, login_1.initAuth)();
}
