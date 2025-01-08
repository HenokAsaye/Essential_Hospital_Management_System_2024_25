import { getData } from '../../utility/api-helper';

// Interface for the medical history data structure
interface MedicalHistory {
  diagnosis: string;
  treatment: string;
  date: string;
}

// Fetch medical history for a specific patient
export async function fetchMedicalHistory(
  patientId: number,
): Promise<MedicalHistory[]> {
  try {
    const response: MedicalHistory[] = await getData(
      `/patient/medical-history?patientId=${patientId}`,
    );
    return response.map((entry: any) => ({
      diagnosis: entry.diagnosis,
      treatment: entry.treatment,
      date: entry.date,
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch medical history:', error.message);
    } else {
      console.error('Failed to fetch medical history:', error);
    }
    throw error;
  }
}

// Function to populate the medical history section
export async function populateMedicalHistory(patientId: number) {
  const medicalHistoryContainer = document.getElementById('medical-history');
  try {
    const medicalHistory = await fetchMedicalHistory(patientId);
    if (medicalHistoryContainer) {
      medicalHistoryContainer.innerHTML = medicalHistory
        .map(
          (entry) =>
            `<div class="medical-history-card">
              <p><strong>Condition:</strong> ${entry.diagnosis}</p>
              <p><strong>Treatment:</strong> ${entry.treatment}</p>
              <p><strong>Date:</strong> ${entry.date}</p>
            </div>`,
        )
        .join('');
    } else {
      console.error('Medical history container not found.');
    }
  } catch (error) {
    if (medicalHistoryContainer) {
      medicalHistoryContainer.innerHTML = '<p>Error loading medical history.</p>';
    }
    console.error(error);
  }
}
