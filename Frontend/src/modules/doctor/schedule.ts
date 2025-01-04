import { postData } from '../../utility/api-helper';

interface ScheduleDto {
  doctorId: string;
  date: string;
  time: string;
}

interface SearchDto {
  name: string; 
}

// Function to schedule an appointment
export async function scheduleAppointment(
  doctorId: string,
  patientName: string,
  date: string,
  time: string,
): Promise<void> {
  const scheduleDto: ScheduleDto = { doctorId, date, time }; 
  const searchDto: SearchDto = { name: patientName }; 

  try {
    // Construct API endpoint with query parameter for patient name
    const response = await postData(
      `/doctor/schedule-appointment?name=${encodeURIComponent(searchDto.name)}`,
      scheduleDto,
    );

    // Log the response and notify the user
    console.log('Appointment scheduled successfully:', response);
    alert('Appointment scheduled successfully!');
  } catch (error: any) {
    // Handle errors and notify the user
    console.error('Error scheduling appointment:', error.message);
    alert(`Failed to schedule appointment: ${error.message}`);
  }
}


export function initializeScheduleForm() {
  const form = document.getElementById('schedule-form') as HTMLFormElement;
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const doctorIdInput = document.getElementById(
      'doctor-id',
    ) as HTMLInputElement;
    const patientNameInput = document.getElementById(
      'patient-name',
    ) as HTMLInputElement;
    const dateInput = document.getElementById('date') as HTMLInputElement;
    const timeInput = document.getElementById('time') as HTMLInputElement;

    // Read input values from the form
    const doctorId = doctorIdInput?.value;
    const patientName = patientNameInput?.value;
    const date = dateInput?.value;
    const time = timeInput?.value;

    // Validate and submit the data
    if (doctorId && patientName && date && time) {
      await scheduleAppointment(doctorId, patientName, date, time);
    } else {
      alert('Please fill in all fields.');
    }
  });
}
