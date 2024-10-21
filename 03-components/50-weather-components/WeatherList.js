import { defineComponent } from "vue";
import WeatherListItem from "./WeatherListItem.js";

export default defineComponent({
    name: 'WeatherList',
    components: {
      WeatherListItem,
    },

    props: {
        weatherData: {
            type: Object,
        },
    },

    template: `
      <ul class="weather-list unstyled-list">
          <WeatherListItem
            v-for="cityWeather in weatherData"
            :cityWeather="cityWeather"
          />
      </ul>
    `
});