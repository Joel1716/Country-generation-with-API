let countryData = "";
async function getCountryData() {
  // GETTING THE DATA FROM THE RESTfuL API
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,tld,subregion,languages,currencies,borders"
    );
    countryData = await response.json();
  } catch {
    alert(
      "Currently going through some problems with our data. Check back later"
    );
  }
  // DEFAULT FILTER FOR ALL THE COUNTRIES TO GENERATE THE HTML
  let filteredData = countryData;
  generateCountryHTML(filteredData);
  // Check what regions actually exist in your data
  const availableRegions = [
    ...new Set(countryData.map((country) => country.region)),
  ];
  countryExtraInfo();
  filterByRegions(countryData);
  filterBySearch(countryData);
}
function filterByRegions(countryData) {
  const selectEl = document.querySelector("select");
  selectEl.addEventListener("change", () => {
    const selectedRegion = selectEl.value;
    if (selectedRegion === "") {
      filteredData = countryData;
    } else if (selectedRegion === "Asia") {
      filteredData = countryData.filter(
        (country) => country.region === selectedRegion
      );
    } else if (selectedRegion === "Europe") {
      filteredData = countryData.filter(
        (country) => country.region === selectedRegion
      );
    } else if (selectedRegion === "Africa") {
      filteredData = countryData.filter(
        (country) => country.region === selectedRegion
      );
    } else if (selectedRegion === "Oceania") {
      filteredData = countryData.filter(
        (country) => country.region === selectedRegion
      );
    } else if (selectedRegion === "Americas") {
      filteredData = countryData.filter(
        (country) => country.region === selectedRegion
      );
    } else if (selectedRegion === "Antarctic") {
      filteredData = countryData.filter(
        (country) => country.region === selectedRegion
      );
    }
    generateCountryHTML(filteredData);
    countryExtraInfo();
  });
}
function filterBySearch(countryData) {
  const searchInput = document.querySelector(".country-input-search");
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const filteredData = countryData.filter(
      (country) =>
        country.name.common.toLowerCase().includes(searchTerm) ||
        (country.capital[0] &&
          country.capital[0].toLowerCase().includes(searchTerm))
    );
    generateCountryHTML(filteredData);
    countryExtraInfo();
  });
}
let capital = "";
function generateCountryHTML(filteredData) {
  const allCountries = document.querySelector(".all-countries");
  // Handle capital (can be an array or undefined)
  const countries = filteredData.map((country) => {
    capital = country.capital ? Object.values(country.capital)[0] : "N/A";
    return ` <div class="each-country" data-name= "${country.name.common}">
        <img src="${country.flags.svg}" alt="" />
       <div class="country-data">
          <h2 class="country-name">${country.name.common}</h2>
          <p>Population: <span class="data">${country.population}</span></p>
          <p>Region: <span class="data">${country.region}</span></p>
          <p>Capital: <span class="data">${capital}</span></p>
       </div>
       </div>`;
  });
  // COMBINING ALL THE DATA IN THE ARRAY
  allCountries.innerHTML = countries.join("");
  return countries.join("");
}
function countryExtraInfo() {
  const extraCountry = document.querySelectorAll(".each-country");
  const mainEl = document.querySelector("main");
  const defaultData = mainEl.innerHTML;
  extraCountry.forEach((country) => {
    country.addEventListener("click", () => {
      const countryName = country.dataset.name;
      // USING NORMALISATION TO FILTER OUT THE DATA USING THEIR NAMES
      const filterRequiredCountry = countryData.filter(
        (country) => country.name.common === countryName
      );
      console.log(filterRequiredCountry);
      let currencies = "";
      let languages = "";
      let tld = "";
      let nativeName = "N/A";
      let subregion = "";
      let borders = "";
      // FOR DATA THAT HAVE INCONSISTENT VALUES
      const processedData = filterRequiredCountry.map((country) => {
        // HANDLING BORDERS(can be an array or undefined)
        if (country.borders.length > 0) {
          country.borders.forEach((border) => {
            borders += `<button>${border}</button>`;
          });
        } else {
          borders = "";
        }

        // Handle top-level domain (can be an array or undefined)
        tld = country.tld ? country.tld.join(", ") : "N/A";

        // Handle languages (can be an object with different keys)
        languages = country.languages
          ? Object.values(country.languages)[0]
          : "N/A";

        // Handle currencies (can be an object with different keys). Maps KEY and VALUES into an array and uses array destructing to assign them to a variable
        currencies = country.currencies
          ? Object.entries(country.currencies)
              .map(([_code, currency]) => `${currency.name}`)
              .join(", ")
          : "N/A";
        // Handle nativeName (nested in name.nativeName with language-specific keys)
        if (country.name.nativeName) {
          // Get the first available native name
          const firstNativeNameKey = Object.keys(country.name.nativeName)[0];
          if (firstNativeNameKey) {
            nativeName =
              country.name.nativeName[firstNativeNameKey].official ||
              country.name.nativeName[firstNativeNameKey].common;
          }
        }
        // COUNTRIES THAT MAY NOT HAVE A SUB-REGION
        subregion = country.subregion ? country.subregion : "N/A";
      });
      mainEl.innerHTML = `
      <div class="countryDataLayout">
        <button class="back-arrow">
          <ion-icon name="arrow-back-outline"></ion-icon> Back
        </button>
        <div class="eachCountryDataContainer">
          <img src="${filterRequiredCountry[0].flags.svg}" alt="" />
          <div class="eachCountryData">
            <h2>${filterRequiredCountry[0].name.common}</h2>
            <div class="allData">
              <p>Native Name: <span class="data">${nativeName}</span></p>
              <p>Population: <span class="data">${filterRequiredCountry[0].population}</span></p>
              <p>Region: <span class="data">${filterRequiredCountry[0].region}</span></p>
              <p>Sub Region: <span class="data">${subregion}</span></p>
              <p>Capital: <span class="data">${capital}</span></p>
              <p>Top Level Domain: <span class="data">${tld}</span></p>
              <p>Currencies: <span class="data">${currencies}</span></p>
              <p>Languages: <span class="data">${languages}</span></p>
            </div>
            <div class="border-countries-container">
              <p>Border Countries: </p>
              <div class="border-countries">${borders}</div>
            </div>
          </div>
        </div>
      </div>
      `;
      const backArrow = document.querySelector(".back-arrow");
      backArrow.addEventListener("click", () => {
        mainEl.innerHTML = defaultData;
        getCountryData();
      });
    });
  });
}
getCountryData();
function backgroundMode() {
  // TOGGLING BETWEEN LIGHT AND DARK MODE
  const backgroundMode = document.querySelector(".background-mode");
  const bodyEl = document.querySelector("body");
  backgroundMode.addEventListener("click", () => {
    bodyEl.classList.toggle("light");
  });
}
backgroundMode();
