var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchAppointments, populateAppointments } from './appointment.js';
import { fetchMedicalHistory, populateMedicalHistory } from './medicalHistory.js';
// Fetch and combine all the data needed for the patient dashboard
export function fetchDashboardData(patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const appointments = yield fetchAppointments(patientId);
            const medicalHistory = yield fetchMedicalHistory(patientId);
            // Return combined data for the dashboard
            return {
                appointments,
                medicalHistory,
            };
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching dashboard data:', error.message);
            }
            else {
                console.error('Error fetching dashboard data:', error);
            }
            throw error;
        }
    });
}
// Function to get the patientId from the JWT token in cookies
export function getPatientIdFromToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('/auth/signup', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = yield response.json();
            return data.patientId; // Assuming the backend sends the patientId in the response
        }
        catch (error) {
            console.error('Error fetching patientId:', error);
            return null;
        }
    });
}
// Initialize the page
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = yield getPatientIdFromToken();
    if (patientId) {
        yield fetchDashboardData(patientId);
        populateAppointments(patientId);
        populateMedicalHistory(patientId);
    }
    else {
        console.error('Patient ID could not be retrieved');
    }
}));
