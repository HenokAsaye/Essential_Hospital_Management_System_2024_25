import { postData } from '../../utility/api-helper.js';

export function inviteAdmin() {
    const emailInput = document.getElementById('admin-email');
    if (!emailInput || !emailInput.value) {
        alert('Please enter an email address');
        return;
    }
    const data = { email: emailInput.value };
    postData('/admin/invite-admin', data)
        .then((response) => {
            alert('Invitation sent successfully');
            emailInput.value = ''; 
        })
        .catch((error) => {
            console.error('Error inviting admin:', error);
            if (error.message.includes('User not found')) {
                alert('Error: User not found. Please check the email address.');
            } else if (error.message.includes('user already An Admin')) {
                alert('Error: User is already an admin.');
            } else {
                alert('Failed to send the invitation. Please try again later.');
            }
        });
}
export function initInviteAdminForm() {
    const inviteButton = document.getElementById('invite-admin-button');
    if (inviteButton) {
        inviteButton.addEventListener('click', inviteAdmin);
    }
}
