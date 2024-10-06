import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',
  setup() {
    const ablsoluteZeroTemperature = 273.15;

    const alertMessage = (alert) => {
      return `${alert.sender_name}: ${alert.description}`;
    };

    const convertKelvinToCelsius = (tempInKelvin) => {
      return (tempInKelvin - ablsoluteZeroTemperature).toFixed(1);
    };

    const pressureFormatted = (pressureRawValue) => {
      return (pressureRawValue * 0.75).toFixed();
    };

    const parseTime = (timeString) => {
      const [hours, minutes] = timeString.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    };

    const isNight = (cityWeatherData) => {
      const currentTime = parseTime(cityWeatherData.current.dt);
      const sunriseTime = parseTime(cityWeatherData.current.sunrise);
      const sunsetTime = parseTime(cityWeatherData.current.sunset);
      return currentTime < sunriseTime || currentTime > sunsetTime;
    };

    const cityWeatherData = getWeatherData();

    const weatherFormatted = cityWeatherData.map(cityWeather => ({
      geographic_name: cityWeather.geographic_name,
      current: {
        ...cityWeather.current,
        tempCelsius: `${convertKelvinToCelsius(cityWeather.current.temp)} °C`,
        pressureFormatted: `${pressureFormatted(cityWeather.current.pressure)} мм рт. ст.`,
        weatherIcon: WeatherConditionIcons[cityWeather.current.weather.id],
        isNight: isNight(cityWeather)
      },
      alert: cityWeather.alert ? alertMessage(cityWeather.alert) : null,
    }));

    return {
      weatherFormatted,
    };
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
      <ul class="weather-list unstyled-list">
        <li v-for="cityWeather in weatherFormatted" class="weather-card" :class="{'weather-card--night': cityWeather.current.isNight}">
          <div v-if="cityWeather.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ cityWeather.alert }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ cityWeather.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ cityWeather.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="cityWeather.current.weather.description">{{ cityWeather.current.weatherIcon }}</div>
            <div class="weather-conditions__temp">{{ cityWeather.current.tempCelsius }}</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ cityWeather.current.pressureFormatted }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ cityWeather.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ cityWeather.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ cityWeather.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
