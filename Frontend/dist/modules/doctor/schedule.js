var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { postData } from '../../utility/api-helper.js';
// Function to schedule an appointment
export function scheduleAppointment(doctorId, patientName, date, time) {
    return __awaiter(this, void 0, void 0, function* () {
        const scheduleDto = { doctorId, date, time };
        const searchDto = { name: patientName };
        try {
            // Construct API endpoint with query parameter for patient name
            const response = yield postData(`/doctor/schedule-appointment?name=${encodeURIComponent(searchDto.name)}`, scheduleDto);
            // Log the response and notify the user
            console.log('Appointment scheduled successfully:', response);
            alert('Appointment scheduled successfully!');
        }
        catch (error) {
            // Handle errors and notify the user
            console.error('Error scheduling appointment:', error.message);
            alert(`Failed to schedule appointment: ${error.message}`);
        }
    });
}
export function initializeScheduleForm() {
    const form = document.getElementById('schedule-form');
    if (!form)
        return;
    form.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const doctorIdInput = document.getElementById('doctor-id');
        const patientNameInput = document.getElementById('patient-name');
        const dateInput = document.getElementById('date');
        const timeInput = document.getElementById('time');
        // Read input values from the form
        const doctorId = doctorIdInput === null || doctorIdInput === void 0 ? void 0 : doctorIdInput.value;
        const patientName = patientNameInput === null || patientNameInput === void 0 ? void 0 : patientNameInput.value;
        const date = dateInput === null || dateInput === void 0 ? void 0 : dateInput.value;
        const time = timeInput === null || timeInput === void 0 ? void 0 : timeInput.value;
        // Validate and submit the data
        if (doctorId && patientName && date && time) {
            yield scheduleAppointment(doctorId, patientName, date, time);
        }
        else {
            alert('Please fill in all fields.');
        }
    }));
}
