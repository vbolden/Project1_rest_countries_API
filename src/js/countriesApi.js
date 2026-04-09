let countries = [];
let filteredCountries = [];

countries = data;
filteredCountries = data;

async function getAllCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,region,subregion,cca3,population")
        if(!response.ok) {
            throw new Error
        }
        const data = await response.json();
        return data
    } catch(error) {
        console.error("Error message: ", error);
        return []
    }
}
