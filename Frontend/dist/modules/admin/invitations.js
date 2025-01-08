import { postData } from '../../utility/api-helper';
// Function to send an invite to another admin
export function inviteAdmin() {
    const emailInput = document.getElementById('admin-email');
    // Check if the email input is valid
    if (!emailInput || !emailInput.value) {
        alert('Please enter an email address');
        return;
    }
    const data = { email: emailInput.value };
    postData('/admin/invite-admin', data)
        .then((response) => {
        alert(response);
        emailInput.value = '';
    })
        .catch((error) => {
        console.error('Error inviting admin:', error);
        alert('Error sending admin invite. Please try again.');
    });
}
// Function to initialize the invitation form
export function initInviteAdminForm() {
    const inviteButton = document.getElementById('invite-admin-button');
    if (inviteButton) {
        inviteButton.addEventListener('click', inviteAdmin);
    }
}
