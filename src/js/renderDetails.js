// VARIABLES
let currentUrl = new URLSearchParams(document.location.search);
// console.log(currentUrl);
let countryCode = currentUrl.get("code");
// console.log(countryCode);
const flagEl = document.getElementById("flag-container");
const detailsEl = document.getElementById("details-container");
const bordersEl = document.getElementById("borders-container");

// EVENT LISTENER FOR PAGE LOADING
window.addEventListener("load", getDetails);

// FETCH DATA FUNCTION
async function getDetails() {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
        const data = await response.json();
        const country = data[0];
        // console.log(data)

        const transformedData = transformData(country);

        const borderCountries = await getBorderCountries(country);

        renderDetails(transformedData, borderCountries);

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
    const capital = country.capital?.[0] || "N/A";
    const topLevelDomain = country.tld?.[0] || "N/A";
    // console.log(name, population,region,subRegion,capital, flag, topLevelDomain);


    const language = country.languages ? Object.values(country.languages).join(',') : "N/A";
    const currencies = country.currencies ? Object.values(country.currencies)[0].name : "N/A";
    // console.log(language, currencies);

    const nativeName = country.name.nativeName && Object.values(country.name.nativeName).length > 0 ? Object.values(country.name.nativeName)[0].official : "N/A";

    const countryObj = { flag, flagAlt, name, population, region, subRegion, capital, topLevelDomain, language, currencies, nativeName }
    return countryObj
}

// FUNCTION FOR BORDER COUNTRIES
async function getBorderCountries(data) {
    const borders = data.borders || [];

    if (borders.length === 0) return [];

    const borderNames = [];

    for (let i = 0; i < borders.length; i++) {
        const code = borders[i];

        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
            const data = await response.json();

            const name = data[0].name.common;
            borderNames.push(name);
        } catch (error) {
            console.error("Error: ", error);
        }
    }
    return borderNames;
}

// RENDER COUNTRY DETAILS FUNCTION 
function renderDetails(data, borders) {
    flagEl.innerHTML = `<img src="${data.flag}" alt="${data.flagAlt}">`;

    detailsEl.innerHTML = `
    <h2 class="fw-bold mb-4">${data.name}</h2>
    <p><strong>Native Name: </strong>${data.nativeName}</p>
    <p><strong>Population: </strong>${data.population}</p>
    <p><strong>Region: </strong>${data.region}</p>
    <p><strong>Sub Region: </strong>${data.subRegion}</p>
    <p><strong>Capital: </strong>${data.capital}</p>
    <p><strong>Top Level Domain: </strong>${data.topLevelDomain}</p>
    <p><strong>Languages: </strong>${data.language}</p>
    <p><strong>Currencies: </strong>${data.currencies}</p>
    `;

    const borderHTML = borders.length ? borders.map(name => `<button>${name}</button>`).join('') : "<p>No Border Countries</p>";
    bordersEl.innerHTML = borderHTML;
}