import { getData, patchData, deleteData } from '../../utility/api-helper.js';
export async function displayDoctorRequests() {
    console.log('Fetching doctor requests from /admin/doctorRequests');
    try {
        const requests = await getData('/admin/doctorRequests');
        console.log('Doctor requests fetched:', requests);

        const requestsTable = document.getElementById('doctor-requests-table').getElementsByTagName('tbody')[0];
        requestsTable.innerHTML = '';

        requests.forEach((request) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${request.User.name}</td>
                <td>${request.User.email}</td>
                <td>${request.status}</td>
                <td>
                    <button class="btn btn-success" id="approve-${request.id}">Approve</button>
                    <button class="btn btn-danger" id="decline-${request.id}">Decline</button>
                </td>
            `;
            requestsTable.appendChild(row);
            document.getElementById(`approve-${request.id}`).addEventListener('click', async () => {
                await approveDoctorRequest(request.id);
            });

            document.getElementById(`decline-${request.id}`).addEventListener('click', async () => {
                await declineDoctorRequest(request.id);
            });
        });
    } catch (error) {
        console.error('Error fetching doctor requests:', error);
    }
}
async function handleButtonClick(event) {
    const button = event.target;
    const action = button.getAttribute('data-action');
    const requestId = button.getAttribute('data-id');

    if (!action || !requestId) return;

    if (action === 'approve') {
        await approveDoctorRequest(requestId);
    } else if (action === 'decline') {
        await declineDoctorRequest(requestId);
    }
}
export async function approveDoctorRequest(requestId) {
    const data = { id: requestId, status: 'APPROVED' };
    console.log('Approving request with id:', requestId);
    try {
        await patchData('/admin/accept', data);
        displayDoctorRequests();
    } catch (error) {
        console.error('Error approving doctor request:', error);
    }
}
export async function declineDoctorRequest(requestId) {
    console.log('Declining request with id:', requestId);

    try {
        const data = { id: requestId };
        await deleteData('/admin/declineRequest', data);
        displayDoctorRequests();  
    } catch (error) {
        console.error('Error declining doctor request:', error);
    }
}
export function initDoctorApproval() {
    console.log('Initializing doctor approval');
    displayDoctorRequests();
}
