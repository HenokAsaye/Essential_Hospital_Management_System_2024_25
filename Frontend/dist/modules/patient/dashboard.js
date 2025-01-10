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

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift(); 
    }
    return null; 
}

function getUserIdFromToken(token) {
    try {
        console.log("Token:", token); 
        const payload = token.split('.')[1];
        const decodedPayload = atob(payload); 
        const parsedPayload = JSON.parse(decodedPayload); 
        console.log("Decoded Payload:", parsedPayload); 
        return parsedPayload.userId; 
    } catch (error) {
        console.error('Error decoding the token:', error);
        return null;
    }
}

function getPatientIdFromCookie() {
    const token = getCookie('accessToken'); 
    if (token) {
        console.log("Retrieved token from cookie:", token); 
        return getUserIdFromToken(token); 
    }
    console.error("Token not found or invalid");
    return null; 
}

export function fetchDashboardData(patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const appointments = yield fetchAppointments(patientId);
            const medicalHistory = yield fetchMedicalHistory(patientId);
            
            console.log('Appointments:', appointments);  // Add log to check data
            console.log('Medical History:', medicalHistory);  // Add log to check data
            
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

document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = getPatientIdFromCookie();
    if (patientId) {
        try {
            const { appointments, medicalHistory } = yield fetchDashboardData(patientId);
            populateAppointments(appointments);  
            populateMedicalHistory(medicalHistory);  
        } catch (error) {
            console.error('Error loading dashboard:', error);
        }
    } else {
        console.error('Patient ID could not be retrieved');
    }
}));
