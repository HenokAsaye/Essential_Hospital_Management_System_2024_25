"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigateToPage = navigateToPage;
function navigateToPage(role) {
    switch (role) {
        case 'patient':
            window.location.href = 'patient.html';
            break;
        case 'doctor':
            window.location.href = 'doctor.html';
            break;
        case 'admin':
            window.location.href = 'admin.html';
            break;
        default:
            window.location.href = 'index.html';
    }
}
