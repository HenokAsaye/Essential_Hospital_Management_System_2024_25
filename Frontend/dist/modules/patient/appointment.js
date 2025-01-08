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
// Fetch appointments for a specific patient
export function fetchAppointments() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield getData(`/patient/appointments`);
            console.log(response)
            return response.map((appointment) => ({
                id: appointment.id,
                date: appointment.date,
                time: appointment.time,
                doctorName: appointment.Doctor.name,
            }));
        }
        catch (error) {
            console.error('Failed to fetch appointments:');
            throw error;
        }
    });
}
// Function to populate the appointments section
export function populateAppointments(patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        const appointmentsContainer = document.getElementById('appointments');
        try {
            const appointments = yield fetchAppointments(patientId);
            if (appointmentsContainer) {
                appointmentsContainer.innerHTML = appointments
                    .map((appointment) => `<div class="appointment-card">
              <p><strong>Date:</strong> ${appointment.date}</p>
              <p><strong>Time:</strong> ${appointment.time}</p>
              <p><strong>Doctor:</strong> ${appointment.doctorName}</p>
            </div>`)
                    .join('');
            }
            else {
                console.error('Appointments container not found');
            }
        }
        catch (error) {
            if (appointmentsContainer) {
                appointmentsContainer.innerHTML = '<p>Error loading appointments.</p>';
            }
            console.error(error);
        }
    });
}
