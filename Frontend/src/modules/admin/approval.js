"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayDoctorRequests = displayDoctorRequests;
exports.approveDoctorRequest = approveDoctorRequest;
exports.declineDoctorRequest = declineDoctorRequest;
exports.initDoctorApproval = initDoctorApproval;
var api_helper_1 = require("../../utility/api-helper");
// Function to display all doctor requests
function displayDoctorRequests() {
    (0, api_helper_1.getData)('/admin/doctorRequests')
        .then(function (requests) {
        var requestsTable = document.getElementById('doctor-requests-table');
        requestsTable.innerHTML = '';
        // Add each doctor request to the table
        requests.forEach(function (request) {
            var row = document.createElement('tr');
            row.innerHTML = "\n          <td>".concat(request.user.name, "</td>\n          <td>").concat(request.user.email, "</td>\n          <td>").concat(request.status, "</td>\n          <td>\n            <button class=\"btn btn-success\" onclick=\"approveDoctorRequest(").concat(request.id, ")\">Approve</button>\n            <button class=\"btn btn-danger\" onclick=\"declineDoctorRequest(").concat(request.id, ")\">Decline</button>\n          </td>\n        ");
            requestsTable.appendChild(row);
        });
    })
        .catch(function (error) {
        console.error('Error fetching doctor requests:', error);
    });
}
// Function to approve a doctor request
function approveDoctorRequest(requestId) {
    var data = { id: requestId, status: 'APPROVED' };
    (0, api_helper_1.patchData)('/admin/accept', data)
        .then(function () {
        displayDoctorRequests();
    })
        .catch(function (error) {
        console.error('Error approving doctor request:', error);
    });
}
// Function to decline a doctor request
function declineDoctorRequest(requestId) {
    var data = { id: requestId };
    (0, api_helper_1.deleteData)("/admin/declineRequest")
        .then(function () {
        displayDoctorRequests();
    })
        .catch(function (error) {
        console.error('Error declining doctor request:', error);
    });
}
// Function to initialize the doctor approval section
function initDoctorApproval() {
    displayDoctorRequests();
}
