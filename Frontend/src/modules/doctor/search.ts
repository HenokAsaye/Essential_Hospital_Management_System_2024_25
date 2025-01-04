import { getData } from '../../utility/api-helper';

const searchForm = document.getElementById('search-form') as HTMLFormElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const resultsTable = document.getElementById(
  'results-table',
) as HTMLTableElement;

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent form from reloading the page

  const name = searchInput.value.trim();
  if (!name) {
    alert('Please enter a name to search.');
    return;
  }

  try {
    const patients = await getData(`/doctor/patients?name=${name}`);

    // Clear previous table rows
    const tbody = resultsTable.querySelector('tbody');
    if (tbody) tbody.remove();

    // Create new table body
    const newTbody = document.createElement('tbody');
    patients.forEach((patient: any, index: number) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${patient.name}</td>
        <td>${patient.email}</td>
      `;
      newTbody.appendChild(row);
    });

    resultsTable.appendChild(newTbody);
    resultsTable.style.display = 'table'; // Show the table
  } catch (error: any) {
    console.error('Error fetching patient data:', error);
    alert('Failed to fetch patient data. Please try again.');
  }
});
