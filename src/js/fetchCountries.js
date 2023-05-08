export { fetchCountries };

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const fields = 'fields=name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?${fields}`)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }

        throw new Error(response.status);
      }

      return response.json();
    })
    .catch(error => console.log(error));
}

//  'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages';
