import { defineComponent, computed } from "vue";
import { WeatherConditionIcons } from "./weather.service.ts";
import WeatherListItemAlert from "./WeatherListItemAlert.js";

export default defineComponent({
    name: 'WeatherListItem',
    components: {
      WeatherListItemAlert,
    },

    props: {
        cityWeather: {
            type: Object,
        },
    },

    setup(props) {
        const ablsoluteZeroTemperature = 273.15;

        const parseTime = (timeString) => {
            const [hours, minutes] = timeString.split(':').map(Number);
            const date = new Date();
            date.setHours(hours, minutes, 0, 0);
            return date;
        };

        const isNight = computed(() => {
            const currentTime = parseTime(props.cityWeather.current.dt);
            const sunriseTime = parseTime(props.cityWeather.current.sunrise);
            const sunsetTime = parseTime(props.cityWeather.current.sunset);
            return currentTime < sunriseTime || currentTime > sunsetTime;
        });

        const temperatureInCelsius = computed(() => {
            return `${(props.cityWeather.current.temp - ablsoluteZeroTemperature).toFixed(1)} °C`;
        });
      
        const pressureFormatted = computed(() => {
            return `${(props.cityWeather.current.pressure * 0.75).toFixed()} мм рт. ст.`;
        });

        const weatherIcon = computed(() => {
          return WeatherConditionIcons[props.cityWeather.current.weather.id];
        })

        return {
          isNight,
          temperatureInCelsius,
          pressureFormatted,
          weatherIcon,
        }
    },

    template: `
      <li class="weather-card" :class="{'weather-card--night': isNight}">
        <WeatherListItemAlert 
          v-if="cityWeather.alert"
          :sender="cityWeather.alert.sender_name"
          :message="cityWeather.alert.description"
        />
        <div>
          <h2 class="weather-card__name">
            {{ cityWeather.geographic_name }}
          </h2>
          <div class="weather-card__time">
            {{ cityWeather.current.dt }}
          </div>
        </div>
        <div class="weather-conditions">
          <div class="weather-conditions__icon" :title="cityWeather.current.weather.description">{{ weatherIcon }}</div>
          <div class="weather-conditions__temp">{{ temperatureInCelsius }}</div>
        </div>
        <div class="weather-details">
          <div class="weather-details__item">
            <div class="weather-details__item-label">Давление, мм рт. ст.</div>
            <div class="weather-details__item-value">{{ pressureFormatted }}</div>
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
    `
})