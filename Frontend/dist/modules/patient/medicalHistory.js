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

export function fetchMedicalHistory(patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield getData(`/patient/medical-history`);
            console.log('Medical History Response:', response);  // Log the response

            // Check if response is an array directly
            if (Array.isArray(response)) {
                return response;
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            console.error('Failed to fetch medical history:', error);
            throw error;
        }
    });
}

export function populateMedicalHistory(medicalHistory) {
    console.log('Populate Medical History with:', medicalHistory);  // Log the data

    if (!Array.isArray(medicalHistory) || medicalHistory.length === 0) {
        console.error('Invalid data format for medicalHistory or empty data');
        return;
    }

    // Get the container element where you want to display the medical history
    const container = document.getElementById('medical-history');
    
    // If the container doesn't exist, log an error and return
    if (!container) {
        console.error('Medical history container not found');
        return;
    }

    // Clear the container before adding new content
    container.innerHTML = '';

    // Iterate over each entry in medical history and append to the container
    medicalHistory.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.classList.add('medical-history-entry');
        entryElement.innerHTML = `
            <div><strong>Diagnosis:</strong> ${entry.diagnosis}</div>
            <div><strong>Treatment:</strong> ${entry.note}</div>  <!-- Assuming 'note' corresponds to the treatment -->
            <div><strong>Date:</strong> ${new Date(entry.date).toLocaleDateString()}</div>
        `;
        container.appendChild(entryElement);
    });
}
