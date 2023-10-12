const endpoint = 'https://covid-193.p.rapidapi.com/statistics';
const rapidapiKey = '1dc449b6bcmsh122b43b35956f35p1b9d2ejsne51ddeaf41cc';

async function trackCovidData() {
    const countryInput = document.getElementById('countryInput').value.trim();
    const resultsDiv = document.getElementById('results');

    if (!countryInput) {
        alert('Ketik Dulu Negaranya');
        return;
    }

    try {
        const response = await fetch(`${endpoint}?country=${countryInput}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'covid-193.p.rapidapi.com',
                'X-RapidAPI-Key': '1dc449b6bcmsh122b43b35956f35p1b9d2ejsne51ddeaf41cc'
            }
        });

        const data = await response.json();
        if (data.results === 0) {
            alert('Negara Tidak Ditemukan');
            return;
        }

        const countryData = data.response[0];
        const activeCases = countryData.cases.active;
        const newCases = countryData.cases.new;
        const recoveredCases = countryData.cases.recovered;
        const totalCases = countryData.cases.total;
        const totalDeaths = countryData.deaths.total;
        const totalTests = countryData.tests.total;
        const population = countryData.population;

        const activeCasesPercentage = ((activeCases / population) * 100).toFixed(2);
        const newCasesPercentage = ((newCases / population) * 100).toFixed(2);
        const recoveredCasesPercentage = ((recoveredCases / population) * 100).toFixed(2);
        const totalCasesPercentage = ((totalCases / population) * 100).toFixed(2);
        const totalDeathsPercentage = ((totalDeaths / population) * 100).toFixed(2);
        const totalTestsPercentage = ((totalTests / population) * 100).toFixed(2)

        resultsDiv.innerHTML = `
            <h2>COVID-19 Stats for ${countryInput}</h2>
            <p>Active Cases: ${activeCases} (${activeCasesPercentage}%)</p>
            <p>New Cases: ${newCases} (${newCasesPercentage}%)</p>
            <p>Recovered Cases: ${recoveredCases} (${recoveredCasesPercentage}%)</p>
            <p>Total Cases: ${totalCases} (${totalCasesPercentage}%)</p>
            <p>Total Deaths: ${totalDeaths} (${totalDeathsPercentage}%)</p>
            <p>Total Tests: ${totalTests} (${totalTestsPercentage}%)</p>
        `;
    } catch (error) {
        console.error('Error fetching COVID-19 data:', error);
    }
}
