const API_KEY = "5ba8a1a2-0fff-4d48-8769-b9f31b60be79";
const CT_URL = `https://holidayapi.com/v1/countries?pretty&key=${API_KEY}`;
const LN_URL = `https://holidayapi.com/v1/languages?pretty&key=${API_KEY}`;
const HLD_URL = `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}`;

const getCountriesName = async () => {
  try {
    const { countries: countriesArray } = await (await fetch(CT_URL)).json();
    console.log(countriesArray);
    return countriesArray;
  } catch (error) {
    console.log(error);
  }
};
// getCountriesName();
const getLanguageList = async () => {
  try {
    const { languages } = await (await fetch(LN_URL)).json();
    console.log(languages);
    return languages;
  } catch (error) {
    console.log(error);
  }
};
// getLanguageList();

const searchInfo = document.getElementById("search-query");
const yearInfo = document.getElementById("year-query");
const monthInfo = document.getElementById("month-query");
const dayInfo = document.getElementById("day-query");
const countryInfo = document.getElementById("country-query");
const languagesInfo = document.getElementById("language-query");
let userInput = "";
/////
const getHolidayList = async () => {
  try {
    queryParameter = {
      search: searchInfo.value,
      year: yearInfo.value || "2022",
      month: monthInfo.value,
      day: dayInfo.value,
      country: searchInfo.value ? countryInfo.value : countryInfo.value || "VN",
      language: languagesInfo.value,
    };
    const userInputs = Object.keys(queryParameter).reduce((acc, currentKey) => {
      if (queryParameter[currentKey]) {
        acc += `&${currentKey}=${queryParameter[currentKey]}`;
      }
      console.log(acc);
      return acc;
    }, "");

    /////
    // queryparameter= {
    //   search: searchInfo.value,
    //   year: yearInfo.value||"2022",
    //   month: monthInfo.value,
    //   day: dayInfo.value,
    //   country: searchInfo.value? countryInfo.value: countryInfo.value||"VN",
    //   language: languagesInfo.value,
    // }

    // const userInputs = Object.keys(queryparameter).reduce((acc,currentKey)=>{
    //   if(queryParameter[currentKey]){
    //     acc += `&${currentKey}=${queryParameter[currentKey]}`;
    //   }
    //   console.log(acc);
    //   return acc;

    // },"");
    const { holidays } = await (await fetch(`${HLD_URL}${userInputs}`)).json();
    console.log(holidays);
    return holidays;
  } catch (error) {
    console.log(error);
  }
};
// getHolidayList();
const renderLanguagesList = document.getElementById("languages-list-btn");
const renderCountriesList = document.getElementById("countries-list-btn");
const renderHolidaybtn = document.getElementById("holidays-btn");
///
const addListOfCountries = document.getElementById("countriesUl");
addListOfCountries.innerHTML = "";
// console.log(addListOfCountries);
const addListOfLanguages = document.getElementById("languagesUl");
addListOfLanguages.innerHTML = "";
// console.log(addListOfLanguages);
const addListOfHoliday = document.getElementById("holidayUl");
addListOfHoliday.innerHTML = "";
////
const renderCountries = async () => {
  try {
    const data = await getCountriesName();
    console.log(data);
    data.forEach((element, index) => {
      const addList = document.createElement("li");
      addList.innerHTML = `
        <div class="bullet">${index + 1}</div>
        <div class="li-wrapper">
          <div class="li-title">${element.name}</div>
          <div class="li-text">Code: ${element.code}</div>
        </div>
      `;
      addListOfCountries.appendChild(addList);
    });
  } catch (error) {
    console.log("err", error);
  }
};
////
const redenLanguages = async () => {
  try {
    const data = await getLanguageList();
    console.log(data);
    data.forEach((element, index) => {
      const addList = document.createElement("li");
      addList.innerHTML = `
      <div class="bullet">${index + 1}</div>
      <div class="li-wrapper">
        <div class="li-title">${element.name}</div>
        <div class="li-text">Code: ${element.code}</div>
      </div>
    `;
      addListOfLanguages.appendChild(addList);
    });
  } catch (error) {
    console.log("error:", error);
  }
};
const renderHoliday = async () => {
  try {
    const data = await getHolidayList();

    console.log(data);
    data.forEach((element, index) => {
      const daylist = element.weekday.date.name;
      // console.log(daylist);
      const addList = document.createElement("li");
      addList.innerHTML = `
        <div class="bullet">${index + 1}</div>
                      <div class="li-wrapper">
                        <div class="li-title">${element.name}</div>
                        <div class="li-text">${daylist} - ${element.date}</div>
                      </div>
      `;
      addListOfHoliday.appendChild(addList);
    });
  } catch (error) {
    console.log("can not get holidays list", error);
  }
};

////
renderCountriesList.addEventListener("click", renderCountries);
renderLanguagesList.addEventListener("click", redenLanguages);
renderHolidaybtn.addEventListener("click", () => {
  addListOfHoliday.innerHTML = "";
  renderHoliday();
});
