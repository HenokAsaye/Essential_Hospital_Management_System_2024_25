import { fetchAppointments } from '../modules/patient/appointment';
import { fetchMedicalHistory } from '../../src/modules/patient/medical-history';
import { fetchDashboardData } from '../modules/patient/dashboard';

// Function to populate the appointments section
async function populateAppointments(patientId) {
  const appointmentsContainer = document.getElementById('appointments');
  try {
    const appointments = await fetchAppointments(patientId);
    appointmentsContainer.innerHTML = appointments
      .map(
        (appointment) =>
          `<div class="appointment-card">
            <p><strong>Date:</strong> ${appointment.date}</p>
            <p><strong>Time:</strong> ${appointment.time}</p>
            <p><strong>Doctor:</strong> ${appointment.doctorName}</p>
          </div>`,
      )
      .join('');
  } catch (error) {
    appointmentsContainer.innerHTML = '<p>Error loading appointments.</p>';
    console.error(error);
  }
}

// Function to populate the medical history section
async function populateMedicalHistory(patientId) {
  const medicalHistoryContainer = document.getElementById('medical-history');
  try {
    const medicalHistory = await fetchMedicalHistory(patientId);
    medicalHistoryContainer.innerHTML = medicalHistory
      .map(
        (entry) =>
          `<div class="medical-history-card">
            <p><strong>Condition:</strong> ${entry.condition}</p>
            <p><strong>Treatment:</strong> ${entry.treatment}</p>
            <p><strong>Date:</strong> ${entry.date}</p>
          </div>`,
      )
      .join('');
  } catch (error) {
    medicalHistoryContainer.innerHTML = '<p>Error loading medical history.</p>';
    console.error(error);
  }
}

// Main function to populate the dashboard
async function populateDashboard(patientId) {
  await populateAppointments(patientId);
  await populateMedicalHistory(patientId);
}

// Function to get the patientId from the JWT token in cookies
async function getPatientIdFromToken() {
  try {
    const response = await fetch('/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.patientId; // Assuming the backend sends the patientId in the response
  } catch (error) {
    console.error('Error fetching patientId:', error);
    return null;
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
  const patientId = await getPatientIdFromToken();
  if (patientId) {
    populateDashboard(patientId);
  } else {
    console.error('Patient ID could not be retrieved');
  }
});
