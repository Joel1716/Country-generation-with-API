let countryData = "";
async function getCountryData() {
  const response = await fetch("data.json");
  countryData = await response.json();
  //   console.log(countryData);
  let filteredData = countryData;
  generateCountryHTML(filteredData);
  // Check what regions actually exist in your data
  const availableRegions = [
    ...new Set(countryData.map((country) => country.region)),
  ];
  countryExtraInfo();
  filterByRegions(countryData);
  filterBySearch(countryData);
  console.log(availableRegions);
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
    } else if (selectedRegion === "Antarctic Ocean") {
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
        country.name.toLowerCase().includes(searchTerm) ||
        (country.capital && country.capital.toLowerCase().includes(searchTerm))
    );
    generateCountryHTML(filteredData);
    countryExtraInfo();
  });
}
function generateCountryHTML(filteredData) {
  const allCountries = document.querySelector(".all-countries");
  const countries = filteredData.map((country) => {
    return ` <div class="each-country" data-name= "${country.name}">
        <img src="${country.flags.svg}" alt="" />
       <div class="country-data">
          <h2 class="country-name">${country.name}</h2>
          <p>Population: <span class="data">${country.population}</span></p>
          <p>Region: <span class="data">${country.region}</span></p>
          <p>Capital: <span class="data">${country.capital}</span></p>
       </div>
       </div>`;
  });
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
      const filterRequiredCountry = countryData.filter(
        (country) => country.name === countryName
      );
      let countries = "";
      let languages = "";
      let topLevelDomain = "";
      countries = filterRequiredCountry[0].currencies.map((country) => {
        return `<span class="data">${country.name}</span>`;
      });
      languages = filterRequiredCountry[0].languages.map((language) => {
        return `<span class="data">${language.name}</span>`;
      });
      topLevelDomain = filterRequiredCountry[0].topLevelDomain.map((domain) => {
        return `<span class="data">${domain}</span>`;
      });
      console.log(filterRequiredCountry);
      mainEl.innerHTML = `
      <div class="countryDataLayout">
        <button class="back-arrow">
          <ion-icon name="arrow-back-outline"></ion-icon> Back
        </button>
        <div class="eachCountryDataContainer">
          <img src="${filterRequiredCountry[0].flags.svg}" alt="" />
          <div class="eachCountryData">
            <h2>${filterRequiredCountry[0].name}</h2>
            <div class="allData">
              <p>Native Name: <span class="data">${filterRequiredCountry[0].nativeName}</span></p>
              <p>Population: <span class="data">${filterRequiredCountry[0].population}</span></p>
              <p>Region: <span class="data">${filterRequiredCountry[0].region}</span></p>
              <p>Sub Region: <span class="data">${filterRequiredCountry[0].subregion}</span></p>
              <p>Capital: <span class="data">${filterRequiredCountry[0].capital}</span></p>
              <p>Top Level Domain: ${topLevelDomain}</p>
              <p>Currencies: ${countries}</p>
              <p>Languages: ${languages}</p>
            </div>
            <div class="border-countries">
              <p>Border Countries: </p>
              <button>France</button>
              <button>Germany</button>
              <button>Netherlands</button>
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
  const backgroundMode = document.querySelector(".background-mode");
  const bodyEl = document.querySelector("body");
  backgroundMode.addEventListener("click", () => {
    bodyEl.classList.toggle("light");
  });
}
backgroundMode();
