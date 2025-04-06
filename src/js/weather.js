let currCity = 'Kyiv';
let units = 'metric';
const API_KEY = 'a59900c9878d74fdeb8c60d22b180d3c';

const selectors = {
  city: '.weather__city',
  datetime: '.weather__datetime',
  forecast: '.weather__forecast',
  temperature: '.weather__temperature',
  icon: '.weather__icon',
  minmax: '.weather__minmax',
  realfeel: '.weather__realfeel',
  humidity: '.weather__humidity',
  wind: '.weather__wind',
  pressure: '.weather__pressure',
};

const elements = {};
for (const key in selectors) {
  elements[key] = document.querySelector(selectors[key]);
}

document.querySelector('.weather__search').addEventListener('submit', e => {
  e.preventDefault();
  const searchInput = document.querySelector('.weather__searchform');
  if (searchInput.value.trim()) {
    currCity = searchInput.value.trim();
    getWeather();
    searchInput.value = '';
  }
});

document
  .querySelector('.weather_unit_celsius')
  .addEventListener('click', () => {
    if (units !== 'metric') {
      units = 'metric';
      getWeather();
    }
  });

document
  .querySelector('.weather_unit_farenheit')
  .addEventListener('click', () => {
    if (units !== 'imperial') {
      units = 'imperial';
      getWeather();
    }
  });

function convertTimeStamp(timestamp, timezone) {
  const convertTimezone = timezone / 3600;
  return new Date(timestamp * 1000).toLocaleString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: `Etc/GMT${convertTimezone >= 0 ? '-' : '+'}${Math.abs(
      convertTimezone
    )}`,
    hour12: true,
  });
}

function convertCountryCode(country) {
  return new Intl.DisplayNames(['en'], { type: 'region' }).of(country);
}

async function getWeather() {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`
    );
    const data = await res.json();

    if (data.cod !== 200) throw new Error(data.message);

    elements.city.textContent = `${data.name}, ${convertCountryCode(
      data.sys.country
    )}`;
    elements.datetime.textContent = convertTimeStamp(data.dt, data.timezone);
    elements.forecast.innerHTML = `<p>${data.weather[0].main}</p>`;
    elements.temperature.innerHTML = `${data.main.temp.toFixed()}&#176;`;
    elements.icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="Weather Icon">`;
    elements.minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}</p><p>Max: ${data.main.temp_max.toFixed()}</p>`;
    elements.realfeel.textContent = `${data.main.feels_like.toFixed()}\u00B0`;
    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.wind.textContent = `${data.wind.speed} ${
      units === 'imperial' ? 'mph' : 'm/s'
    }`;
    elements.pressure.textContent = `${data.main.pressure} hPa`;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
}

getWeather();

export { getWeather };
