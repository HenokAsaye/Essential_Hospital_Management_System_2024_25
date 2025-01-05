import { getData } from '../../utility/api-helper';

// Interface for the appointment data structure
interface Appointment {
  id: number;
  date: string;
  time: string;
  doctorName: string;
}

// Fetch appointments for a specific patient
export async function fetchAppointments(
  patientId: number,
): Promise<Appointment[]> {
  try {
    const response: Appointment[] = await getData(
      `/patient/appointments?patientId=${patientId}`,
    );
    return response.map((appointment: any) => ({
      id: appointment.id,
      date: appointment.date,
      time: appointment.time,
      doctorName: appointment.Doctor.name,
    }));
  } catch (error) {
    console.error('Failed to fetch appointments:', error.message);
    throw error;
  }
}
