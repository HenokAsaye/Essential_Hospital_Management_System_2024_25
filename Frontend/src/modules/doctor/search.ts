import { getData } from '../../utility/api-helper';
import { initializeHistory } from './history';

const searchForm = document.getElementById('search-form') as HTMLFormElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const resultsTable = document.getElementById(
  'results-table',
) as HTMLTableElement;
const patientHistorySection = document.getElementById(
  'patient-history',
) as HTMLElement;

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent form from reloading the page

  const name = searchInput.value.trim();
  if (!name) {
    alert('Please enter a name to search.');
    return;
  }

  try {
    const patients = await getData(`/doctor/patients?name=${name}`);

    // Clear previous table rows
    const tbody = resultsTable.querySelector('tbody');
    if (tbody) tbody.remove();

    // Create new table body
    const newTbody = document.createElement('tbody');
    patients.forEach((patient: any, index: number) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${patient.name}</td>
        <td>${patient.email}</td>
        <td>
          <button class="btn btn-primary btn-sm manage-history-btn" data-patient-id="${patient.id}">
            Manage Medical History
          </button>
        </td>
      `;
      newTbody.appendChild(row);
    });

    resultsTable.appendChild(newTbody);
    resultsTable.style.display = 'table'; // Show the table

    // Add event listeners for "Manage Medical History" buttons
    const manageButtons = document.querySelectorAll('.manage-history-btn');
    manageButtons.forEach((button) => {
      button.addEventListener('click', (event: any) => {
        const patientId = event.target.dataset.patientId;
        handleManageHistory(patientId);
      });
    });
  } catch (error: any) {
    console.error('Error fetching patient data:', error);
    alert('Failed to fetch patient data. Please try again.');
  }
});

// Handle the "Manage Medical History" button click
async function handleManageHistory(patientId: number) {
  if (patientHistorySection) {
    patientHistorySection.style.display = 'block'; 
  }
  await initializeHistory(patientId); 
}
