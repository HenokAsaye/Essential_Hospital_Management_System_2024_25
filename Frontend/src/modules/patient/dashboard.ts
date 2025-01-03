import { fetchAppointments} from './appointment';
import { fetchMedicalHistory } from './medicalHistory';

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
