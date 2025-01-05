import { getData, postData } from '../../utility/api-helper';

// Interfaces for patient and medical history
interface MedicalHistory {
  diagnosis: string;
  note: string;
  date: string; // ISO format (e.g., "2025-01-05T00:00:00Z")
}

interface Patient {
  id: number;
  name: string;
  medicalHistory: MedicalHistory[];
}

// Fetch patient history by patient ID
export async function fetchPatientHistory(
  patientId: number,
): Promise<Patient | null> {
  try {
    const response = await getData(`/doctor/patients?patientId=${patientId}`);
    console.log('Patient history fetched successfully:', response);
    return response as Patient;
  } catch (error: any) {
    console.error('Error fetching patient history:', error.message);
    alert(`Failed to fetch patient history: ${error.message}`);
    return null;
  }
}

// Update patient medical history
export async function updatePatientHistory(
  patientId: number,
  diagnosis: string,
  note: string,
  date: string,
): Promise<void> {
  const medicalDto = { diagnosis, note, date };

  try {
    const response = await postData(
      `/doctor/edit-medical-record?patientId=${patientId}`,
      medicalDto,
    );
    console.log('Patient history updated successfully:', response);
    alert('Medical history updated successfully!');
  } catch (error: any) {
    console.error('Error updating patient history:', error.message);
    alert(`Failed to update medical history: ${error.message}`);
  }
}

// Initialize patient history display
export function initializeHistory(patientId: number) {
  const historyContainer = document.getElementById('history-container');
  const historyForm = document.getElementById(
    'history-form',
  ) as HTMLFormElement;

  // Fetch and display patient history
  fetchPatientHistory(patientId).then((patient) => {
    if (!patient || !historyContainer) return;

    // Display patient history in the container
    const historyHtml = patient.medicalHistory
      .map(
        (entry) => `
      <div class="history-entry">
        <p><strong>Date:</strong> ${new Date(entry.date).toLocaleDateString()}</p>
        <p><strong>Diagnosis:</strong> ${entry.diagnosis}</p>
        <p><strong>Note:</strong> ${entry.note}</p>
      </div>
    `,
      )
      .join('');
    historyContainer.innerHTML = historyHtml;
  });

  // Add event listener to the form for updating history
  if (historyForm) {
    historyForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const diagnosisInput = document.getElementById(
        'diagnosis',
      ) as HTMLInputElement;
      const noteInput = document.getElementById('note') as HTMLInputElement;
      const dateInput = document.getElementById('date') as HTMLInputElement;

      const diagnosis = diagnosisInput.value;
      const note = noteInput.value;
      const date = dateInput.value;

      if (diagnosis && note && date) {
        const formattedDate = new Date(date).toISOString();
        await updatePatientHistory(patientId, diagnosis, note, formattedDate);
      } else {
        alert('Please fill in all fields.');
      }
    });
  }
}
