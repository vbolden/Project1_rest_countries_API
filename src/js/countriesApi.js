// VARIABLES 
let countriesData = [];
const cardList = document.getElementById("cards-list");
const searchInput = document.getElementById("search");

// WINDOW LOAD EVENT LISTENER
window.addEventListener("load", getCountries)

// API FETCH FUNCTION
async function getCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital");
        const data = await response.json();

        countriesData = data;

        renderCountries(countriesData);

    } catch (error) {
        console.log(error)
    }
}

// RENDER COUNTRIES FUNCTION
function renderCountries(data) {
    cardList.innerHTML = "";

    data.forEach(country => {
        const name = country.name.common;
        const flag = country.flags.png;
        const population = country.population;
        const region = country.region;
        let capital = country.capital ? country.capital[0] : "N/A";

        let card = document.createElement("div")
        card.className = "col-12 col-md-6 col-lg-3 mb-4"
        card.innerHTML = `
        <div class="card h-100 d-flex flex-column">
            <img src="${flag}" class="card-img-top country-flag" alt="${name}'s flag">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Population: ${population.toLocaleString()}</p>
                <p class="card-text">Region: ${region}</p>
                <p class="card-text">Capital: ${capital}</p>
            </div>
        </div>`;

        cardList.appendChild(card);
    })
};

// SEARCH COUNTRIES BY NAME 
searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();

    if (searchValue === "") {
        renderCountries(countriesData);
        return;
    }

    const filteredCountries = countriesData.filter(country =>
        country.name.common.toLowerCase().includes(searchValue)
    )

    renderCountries(filteredCountries);
})