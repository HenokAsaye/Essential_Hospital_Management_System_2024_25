var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getData } from '../../utility/api-helper.js';
import { initializeHistory } from './history';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsTable = document.getElementById('results-table');
const patientHistorySection = document.getElementById('patient-history');
searchForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault(); // Prevent form from reloading the page
    const name = searchInput.value.trim();
    if (!name) {
        alert('Please enter a name to search.');
        return;
    }
    try {
        const patients = yield getData(`/doctor/patients?name=${name}`);
        // Clear previous table rows
        const tbody = resultsTable.querySelector('tbody');
        if (tbody)
            tbody.remove();
        // Create new table body
        const newTbody = document.createElement('tbody');
        patients.forEach((patient, index) => {
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
            button.addEventListener('click', (event) => {
                const patientId = event.target.dataset.patientId;
                handleManageHistory(patientId);
            });
        });
    }
    catch (error) {
        console.error('Error fetching patient data:', error);
        alert('Failed to fetch patient data. Please try again.');
    }
}));
// Handle the "Manage Medical History" button click
function handleManageHistory(patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (patientHistorySection) {
            patientHistorySection.style.display = 'block';
        }
        yield initializeHistory(patientId);
    });
}
