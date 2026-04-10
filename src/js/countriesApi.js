let countriesData = [];

window.addEventListener("load", getCountries)

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