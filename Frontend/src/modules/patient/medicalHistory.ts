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
    console.error('Failed to fetch medical history:', error.message);
    throw error;
  }
}
