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

// Function to populate the appointments section
export async function populateAppointments(patientId: number) {
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
