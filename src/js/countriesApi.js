// VARIABLES 
let countriesData = [];
const cardList = document.getElementById("cards-list");
const searchInput = document.getElementById("search");

// WINDOW LOAD EVENT LISTENER
window.addEventListener("load", getCountries)

// API FETCH FUNCTION
async function getCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
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
        card.className = "col-md-4 mb-4"
        card.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${flag}" class="card-img-top" alt="${name}'s flag">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Population: ${population.toLocalString()}</p>
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

    
})