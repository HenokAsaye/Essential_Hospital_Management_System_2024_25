var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getData, postData } from '../../utility/api-helper.js';
export function fetchPatientHistory(patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield getData(`/doctor/patients?patientId=${patientId}`);
            console.log('Patient history fetched successfully:', response);
            return response;
        }
        catch (error) {
            console.error('Error fetching patient history:', error.message);
            alert(`Failed to fetch patient history: ${error.message}`);
            return null;
        }
    });
}
export function updatePatientHistory(name, diagnosis, note, date) {
    return __awaiter(this, void 0, void 0, function* () {
        const medicalDto = { diagnosis, note, date };
        try {
            const response = yield postData(`/doctor/edit-medical-record?patientId=${patientId}`, medicalDto);
            console.log('Patient history updated successfully:', response);
            alert('Medical history updated successfully!');
        }
        catch (error) {
            console.error('Error updating patient history:', error.message);
            alert(`Failed to update medical history: ${error.message}`);
        }
    });
}
export function initializeHistory(patientId) {
    const historyContainer = document.getElementById('history-container');
    const historyForm = document.getElementById('history-form');
    fetchPatientHistory(patientId).then((patient) => {
        if (!patient || !historyContainer)
            return;
        const historyHtml = patient.medicalHistory
            .map((entry) => `
      <div class="history-entry">
        <p><strong>Date:</strong> ${new Date(entry.date).toLocaleDateString()}</p>
        <p><strong>Diagnosis:</strong> ${entry.diagnosis}</p>
        <p><strong>Note:</strong> ${entry.note}</p>
      </div>
    `)
            .join('');
        historyContainer.innerHTML = historyHtml;
    });
    if (historyForm) {
        historyForm.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const diagnosisInput = document.getElementById('diagnosis');
            const noteInput = document.getElementById('note');
            const dateInput = document.getElementById('date');
            const diagnosis = diagnosisInput.value;
            const note = noteInput.value;
            const date = dateInput.value;
            if (diagnosis && note && date) {
                const formattedDate = new Date(date).toISOString();
                yield updatePatientHistory(patientId, diagnosis, note, formattedDate);
            }
            else {
                alert('Please fill in all fields.');
            }
        }));
    }
}
