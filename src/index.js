import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

function search(e) {
  const searchCountry = e.target.value.trim();
  if (searchCountry === '') {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return;
  }

  fetchCountries(searchCountry)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
        return;
      }

      let index = countries.findIndex(
        el => el.name.official.toLowerCase() === searchCountry.toLowerCase()
      );

      if (index && countries.length > 1 && countries.length <= 10) {
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = countries
          .map(
            e =>
              `<li><img src="${e.flags.svg}" alt="flag of ${e.name.official}" width="20"> <span>${e.name.official}</span></li>`
          )
          .join('');
        return;
      }
      if (index) {
        index = 0;
      }

      const country = countries[index];

      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = `<h1><img src="${country.flags.svg}" alt="flag" height="25">
<span> ${country.name.official}</span></h1>
<p><b>Capital:</b> ${country.capital}</p>
<p><b>Population:</b> ${country.population}</p>
<p><b>Languages:</b> ${country.languages}</p>`;
    })

    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      return;
    });
}

const deb = debounce(search, DEBOUNCE_DELAY);

refs.input.addEventListener('keydown', deb);
