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

// Function to get a specific cookie by its name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift(); // Return cookie value
    }
    return null; // Cookie not found
}

// Function to decode the JWT token and extract the userId
function getUserIdFromToken(token) {
    try {
        // Split the JWT token to get the payload
        const payload = token.split('.')[1];
        const decodedPayload = atob(payload); // Decode the base64-encoded payload
        const parsedPayload = JSON.parse(decodedPayload); // Parse the decoded string into an object

        return parsedPayload.userId; // Return the userId (patientId) from the payload
    } catch (error) {
        console.error('Error decoding the token:', error);
        return null;
    }
}

// Function to get patientId from the JWT token in cookies
function getPatientIdFromCookie() {
    const token = getCookie('access_token'); // Ensure the correct cookie name 'access_token'
    if (token) {
        console.log("Retrieved token from cookie:", token); // Log the token for debugging
        return getUserIdFromToken(token); // Extract and return the userId from the token
    }
    console.error("Token not found or invalid");
    return null; // Return null if token is not found
}

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
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = getPatientIdFromCookie(); // Get the patientId from the token
    if (patientId) {
        // Fetch the patient's dashboard data once the ID is retrieved
        yield fetchDashboardData(patientId);
        populateAppointments(patientId);
        populateMedicalHistory(patientId);
    } else {
        console.error('Patient ID could not be retrieved');
    }
}));
