export function navigateToPage(role) {
    const normalizedRole = role.toLowerCase();  
    console.log('Navigating to page for role:', normalizedRole);  
    switch (normalizedRole) {
        case 'patient':
            window.location.href = '/public/patient.html';  
            break;
        case 'doctor':
            window.location.href = '/public/doctor.html';  
            break;
        case 'admin':
            window.location.href = '/public/admin.html';  
            break;
        default:
            window.location.href = '/public/index.html'; 
    }
}
