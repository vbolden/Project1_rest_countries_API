// VARIABLES 
let countriesData = [];
const cardList = document.getElementById("cards-list");
const searchInput = document.getElementById("search");
const filterList = document.getElementById("filter");


// EVENT LISTENERS
window.addEventListener("load", () => {
    getCountries();
});
searchInput.addEventListener("input", searchAndFilter);
filterList.addEventListener("change", searchAndFilter);


// API FETCH FUNCTION
async function getCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3");
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

    if (data == "") {
        let empty = document.createElement("p");
        empty.innerHTML = "No Results Found..."
        cardList.appendChild(empty);
    }

    data.forEach(country => {
        const name = country.name.common;
        const flag = country.flags.png;
        const population = country.population;
        const region = country.region;
        const code = country.cca3;
        let capital = country.capital ? country.capital[0] : "N/A";

        let card = document.createElement("div")
        card.className = "col-12 col-md-6 col-lg-3"
        card.innerHTML = `
        <div class="card-wrapper">
            <div class="card shadow-sm border-0">
                <img src="${flag}" class="card-img-top country-flag" alt="${name}'s flag">
                <div class="card-body p-4">
                    <h5 class="card-title fw-bold">${name}</h5>
                    <p class="card-text mt-3">Population: ${population.toLocaleString()}</p>
                    <p class="card-text">Region: ${region}</p>
                    <p class="card-text">Capital: ${capital}</p>
                </div>
            </div>
        </div>`;

        cardList.appendChild(card);

        card.addEventListener("click", () => {
            window.location.href = `details.html?code=${code}`
        })
    })
};

// SEARCH & FILTER COUNTRIES FUNCTION 
function searchAndFilter() {
    let result = countriesData;

    const searchValue = searchInput.value.toLowerCase();
    const selectedRegion = filterList.value;

    if (searchValue) {
        result = result.filter(country =>
            country.name.common.toLowerCase().includes(searchValue)
        );
    }

    if (selectedRegion !== "All") {
        result = result.filter(country =>
            country.region === selectedRegion
        )
    }

    renderCountries(result)
}