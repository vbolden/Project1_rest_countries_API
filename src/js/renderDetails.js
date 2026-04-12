// VARIABLES
let currentUrl = new URLSearchParams(document.location.search);
// console.log(currentUrl);
let countryCode = currentUrl.get("code");
// console.log(countryCode);
const flagEl = document.getElementById("flag-container");
const detailsEl = document.getElementById("details-container");

// EVENT LISTENER FOR PAGE LOADING
window.addEventListener("load", getDetails);

// FETCH DATA FUNCTION
async function getDetails() {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
        const data = await response.json();
        const country = data[0];
        console.log(data)

        const transformedData = transformData(country);
        renderDetails(transformedData);

    } catch (error) {
        console.error("Error: ", error);

    }
}

// FUNCTION TO SHAPE COUNTRY DATA FOR THE UI
function transformData(country) {
    const flag = country.flags.png;
    const flagAlt = country.flags.alt;
    const name = country.name.common;
    const population = country.population.toLocaleString();
    const region = country.region;
    const subRegion = country?.subregion || "N/A";
    let capital = country.capital?.[0] || "N/A";
    let topLevelDomain = country.tld?.[0] || "N/A";
    console.log(name, population,region,subRegion,capital, flag, topLevelDomain);

    // const currencies = data[0].currencies
    // const languages = data[0].languages

    const countryObj = {flag,flagAlt, name, population, region, subRegion, capital, topLevelDomain}
    return countryObj
}

// RENDER COUNTRY DETAILS FUNCTION 
function renderDetails(data) {
    flagEl.innerHTML = `<img src="${data.flag}" alt="${data.flagAlt}">`;

    detailsEl.innerHTML = `
    <h2 class="fw-bold mb-4">${data.name}</h2>
    <p><strong>Population: </strong>${data.population}</p>
    <p><strong>Region: </strong>${data.region}</p>
    <p><strong>Sub Region: </strong>${data.subRegion}</p>
    <p><strong>Capital: </strong>${data.capital}</p>
    <p><strong>Top Level Domain: </strong>${data.topLevelDomain}</p>
    `
}