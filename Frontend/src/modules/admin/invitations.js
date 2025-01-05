"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteAdmin = inviteAdmin;
exports.initInviteAdminForm = initInviteAdminForm;
var api_helper_1 = require("../../utility/api-helper");
// Function to send an invite to another admin
function inviteAdmin() {
    var emailInput = document.getElementById('admin-email');
    // Check if the email input is valid
    if (!emailInput || !emailInput.value) {
        alert('Please enter an email address');
        return;
    }
    var data = { email: emailInput.value };
    (0, api_helper_1.postData)('/admin/invite-admin', data)
        .then(function (response) {
        alert(response);
        emailInput.value = '';
    })
        .catch(function (error) {
        console.error('Error inviting admin:', error);
        alert('Error sending admin invite. Please try again.');
    });
}
// Function to initialize the invitation form
function initInviteAdminForm() {
    var inviteButton = document.getElementById('invite-admin-button');
    if (inviteButton) {
        inviteButton.addEventListener('click', inviteAdmin);
    }
}
