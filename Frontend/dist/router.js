export function navigateToPage(role) {
    const normalizedRole = role.toLowerCase();  // Normalize role to lowercase
    console.log('Navigating to page for role:', normalizedRole);  // Log the normalized role
    switch (normalizedRole) {
        case 'patient':
            window.location.href = '/public/patient.html';  // Adjust path to be relative from the root of dist
            break;
        case 'doctor':
            window.location.href = '/public/doctor.html';  // Adjust path to be relative from the root of dist
            break;
        case 'admin':
            window.location.href = '/public/admin.html';  // Adjust path to be relative from the root of dist
            break;
        default:
            window.location.href = '/public/index.html';  // Adjust path to be relative from the root of dist
    }
}
