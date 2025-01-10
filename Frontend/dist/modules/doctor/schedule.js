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
        const scheduleDto = {
            doctorId: doctorId.toString(),
            patientId: patientId.toString(),
            date,
            time
        };
        try {
            console.log('Sending appointment request with data:', scheduleDto);
            const responseData = yield postData('/doctor/schedule-appointment', scheduleDto);
            console.log('Appointment response:', responseData);
            alert('Appointment scheduled successfully!');
        } catch (error) {
            console.error('Error scheduling appointment:', error);
            alert(`Failed to schedule appointment: ${error.message || error}`);
        }
export function initializeScheduleForm() {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM fully loaded and parsed.');

        const form = document.getElementById('schedule-form');
        if (!form) {
            console.error('Schedule form not found');
            return;
        }
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const doctorIdInput = document.getElementById('doctor-id');
            const patientIdInput = document.getElementById('patient-id');
            const dateInput = document.getElementById('schedule-date'); // Updated to match the new ID
            const timeInput = document.getElementById('time');

            if (!doctorIdInput || !patientIdInput || !dateInput || !timeInput) {
                console.error('One or more form inputs are missing');
                alert('Form is incomplete. Please check all fields.');
                return;
            }
            const doctorId = doctorIdInput.value.trim();
            const patientId = patientIdInput.value.trim();
            const date = dateInput.value.trim(); 
            const time = timeInput.value.trim();

            console.log('Form Data:', { doctorId, patientId, date, time });
            if (!date || date === '') {
                console.error('Date is required');
                alert('Please select a date.');
                return;
            }
            if (doctorId && patientId && date && time) {
                scheduleAppointment(doctorId, patientId, date, time)
                    .then(() => console.log('Appointment scheduled successfully'))
                    .catch((err) => console.error('Error in scheduling appointment:', err));
            } else {
                alert('Please fill in all fields.');
            }
        });
    });
}
initializeScheduleForm();
