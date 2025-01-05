import { fetchAppointments, populateAppointments } from './appointment';
import { fetchMedicalHistory, populateMedicalHistory } from './medicalHistory';
interface Appointment {
  id: number;
  date: string;
  doctorName: string;
}

interface MedicalHistory {
  diagnosis: string;
  treatment: string;
  date: string;
}

interface DashboardData {
  appointments: Appointment[];
  medicalHistory: MedicalHistory[];
}

// Fetch and combine all the data needed for the patient dashboard
export async function fetchDashboardData(
  patientId: number,
): Promise<DashboardData> {
  try {
    const appointments = await fetchAppointments(patientId);
    const medicalHistory = await fetchMedicalHistory(patientId);

    // Return combined data for the dashboard
    return {
      appointments,
      medicalHistory,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error.message);
    throw error;
  }
}

// Function to get the patientId from the JWT token in cookies
export async function getPatientIdFromToken(): Promise<number | null> {
  try {
    const response = await fetch('/auth/signup', {
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
    await fetchDashboardData(patientId);
    populateAppointments(patientId);
    populateMedicalHistory(patientId);
  } else {
    console.error('Patient ID could not be retrieved');
  }
});
