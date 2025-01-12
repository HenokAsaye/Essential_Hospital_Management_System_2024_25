import { getData, patchData, deleteData } from '../../utility/api-helper';

// Function to display all doctor requests
export function displayDoctorRequests() {
  getData('/admin/doctorRequests') 
    .then((requests) => {
      const requestsTable = document.getElementById(
        'doctor-requests-table',
      ) as HTMLElement;
      requestsTable.innerHTML = ''; 

      // Add each doctor request to the table
      interface User {
        name: string;
        email: string;
      }

      interface DoctorRequest {
        id: number;
        user: User;
        status: string;
      }

      requests.forEach((request: DoctorRequest) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${request.user.name}</td>
          <td>${request.user.email}</td>
          <td>${request.status}</td>
          <td>
            <button class="btn btn-success" onclick="approveDoctorRequest(${request.id})">Approve</button>
            <button class="btn btn-danger" onclick="declineDoctorRequest(${request.id})">Decline</button>
          </td>
        `;
        requestsTable.appendChild(row);
      });
    })
    .catch((error) => {
      console.error('Error fetching doctor requests:', error);
    });
}

// Function to approve a doctor request
export function approveDoctorRequest(requestId: number) {
  const data = { id: requestId, status: 'APPROVED' };

  patchData('/admin/accept', data) 
    .then(() => {
     
      displayDoctorRequests();
    })
    .catch((error) => {
      console.error('Error approving doctor request:', error);
    });
}

// Function to decline a doctor request
export function declineDoctorRequest(requestId: number) {
  const data = { id: requestId };

  deleteData(`/admin/declineRequest`) 
    .then(() => {
      
      displayDoctorRequests();
    })
    .catch((error) => {
      console.error('Error declining doctor request:', error);
    });
}

// Function to initialize the doctor approval section
export function initDoctorApproval() {
  displayDoctorRequests();
}
