var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getData,postData} from '../../utility/api-helper.js';
import { initializeHistory } from './history.js';
import { updatePatientHistory } from './history.js';
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
        resultsTable.style.display = 'table'; 
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
function handleManageHistory(patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Manage History clicked for patient:", patientId);
        if (patientHistorySection) {
            patientHistorySection.style.display = 'block';
        }
        const historyForm = document.getElementById('history-form');
        if (historyForm) {
            historyForm.style.display = 'block'; 
        }
        const updateButton = document.getElementById('update-button');
        if (updateButton) {
            console.log("Update button found. Attaching event listener...");
            updateButton.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                console.log("Update button clicked");
                event.preventDefault();
                const diagnosis = document.getElementById('diagnosis').value.trim();
                const note = document.getElementById('note').value.trim();
                const date = document.getElementById('date').value.trim();

                console.log("Diagnosis:", diagnosis, "Note:", note, "Date:", date);
                if (!diagnosis || !note || !date) {
                    alert('Please fill in all fields.');
                    return;
                }
                const formattedDate = new Date(date).toISOString();
                console.log("Formatted Date:", formattedDate);
                const medicalDto = {
                    diagnosis,
                    note,
                    date: formattedDate,
                };
                try {
                    console.log("Sending data to backend:", medicalDto);
                    const updateResponse = yield postData(`/doctor/edit-medical-record?patientId=${encodeURIComponent(patientId)}`, medicalDto);
                    console.log('Update response:', updateResponse);

                    alert('Medical history updated successfully!');
                    historyForm.reset();
                    historyForm.style.display = 'none';
                } catch (error) {
                    console.error('Error updating patient history:', error);
                    alert(`Failed to update medical history: ${error.message}`);
                }
            }));
        } else {
            console.error("Update button not found");
        }
    });
}
