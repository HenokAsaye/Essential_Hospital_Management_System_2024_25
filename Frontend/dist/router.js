export function navigateToPage(role) {
    switch (role) {
        case 'patient':
            window.location.href = 'C:\Users\hp\Documents\Essential_Hospital_Management_System_2024_25\Frontend\dist\public\patient.html';
            break;
        case 'doctor':
            window.location.href = 'C:\Users\hp\Documents\Essential_Hospital_Management_System_2024_25\Frontend\dist\public\doctor.html';
            break;
        case 'admin':
            window.location.href = 'C:\Users\hp\Documents\Essential_Hospital_Management_System_2024_25\Frontend\dist\public\admin.html';
            break;
        default:
            window.location.href = 'C:\Users\hp\Documents\Essential_Hospital_Management_System_2024_25\Frontend\dist\public\index.html';
    }
}
