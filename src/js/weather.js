let currCity = '';
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
  const input = searchInput.value.trim();

  if (input) {
    currCity = input;
    getWeatherByCity();
    searchInput.value = '';
  } else {
    alert('Please enter a city name');
  }
});

document
  .querySelector('.weather_unit_celsius')
  .addEventListener('click', () => {
    if (units !== 'metric') {
      units = 'metric';
      updateWeather();
    }
  });

document
  .querySelector('.weather_unit_farenheit')
  .addEventListener('click', () => {
    if (units !== 'imperial') {
      units = 'imperial';
      updateWeather();
    }
  });

function convertTimeStamp(timestamp, timezone) {
  const offset = timezone / 3600;
  return new Date(timestamp * 1000).toLocaleString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: `Etc/GMT${offset >= 0 ? '-' : '+'}${Math.abs(offset)}`,
  });
}

function convertCountryCode(country) {
  return new Intl.DisplayNames(['en'], { type: 'region' }).of(country);
}

async function getCityName(lat, lon) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );
    const data = await res.json();
    return data[0]?.name || '';
  } catch {
    return '';
  }
}

function renderWeather(data) {
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
}

async function getWeatherByCity() {
  if (!currCity) return;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        currCity
      )}&appid=${API_KEY}&units=${units}`
    );
    if (!res.ok) throw new Error('City not found');

    const data = await res.json();
    renderWeather(data);
  } catch (error) {
    console.error('Error fetching weather by city:', error.message);
  }
}

async function getWeatherByCoords(lat, lon) {
  try {
    const cityName = await getCityName(lat, lon);
    if (!cityName) throw new Error('City not found for coordinates');

    currCity = cityName;
    await getWeatherByCity();
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error.message);
  }
}

function getWeatherByLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        getWeatherByCoords(latitude, longitude);
      },
      err => {
        console.warn('Geolocation error:', err.message);
      }
    );
  } else {
    console.warn('Geolocation not supported');
  }
}

function updateWeather() {
  if (currCity) {
    getWeatherByCity();
  } else {
    getWeatherByLocation();
  }
}

getWeatherByLocation();

export { getWeatherByCity };
