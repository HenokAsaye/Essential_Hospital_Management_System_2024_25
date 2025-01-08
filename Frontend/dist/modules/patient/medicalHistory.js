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

// Fetch medical history for a specific patient
export function fetchMedicalHistory(patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield getData(`/patient/medical-history?patientId=${patientId}`);

            // Access the medicalHistory array from the response object
            const medicalHistory = response.medicalHistory;

            // Ensure the response is an array before calling map
            if (Array.isArray(medicalHistory)) {
                return medicalHistory.map((entry) => ({
                    diagnosis: entry.diagnosis,
                    treatment: entry.note, // Assuming 'note' corresponds to treatment
                    date: entry.date,
                }));
            } else {
                console.error('Expected an array but got:', medicalHistory);
                throw new Error('Invalid response format');
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error('Failed to fetch medical history:', error.message);
            } else {
                console.error('Failed to fetch medical history:', error);
            }
            throw error;
        }
    });
}

// Function to populate the medical history section
export function populateMedicalHistory(patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        const medicalHistoryContainer = document.getElementById('medical-history');
        try {
            const medicalHistory = yield fetchMedicalHistory(patientId);
            if (medicalHistoryContainer) {
                if (medicalHistory.length > 0) {
                    medicalHistoryContainer.innerHTML = medicalHistory
                        .map((entry) => `<div class="medical-history-card">
                            <p><strong>Condition:</strong> ${entry.diagnosis}</p>
                            <p><strong>Treatment:</strong> ${entry.treatment}</p>
                            <p><strong>Date:</strong> ${entry.date}</p>
                        </div>`)
                        .join('');
                } else {
                    medicalHistoryContainer.innerHTML = '<p>No medical history available.</p>';
                }
            } else {
                console.error('Medical history container not found.');
            }
        } catch (error) {
            if (medicalHistoryContainer) {
                medicalHistoryContainer.innerHTML = '<p>Error loading medical history.</p>';
            }
            console.error(error);
        }
    });
}
