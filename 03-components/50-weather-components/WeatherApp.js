import { defineComponent, onMounted, ref } from 'vue'
import { getWeatherData } from './weather.service.ts'
import WeatherList from './WeatherList.js'
import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherApp',
  components: {
    WeatherList,
  },

  props: {
    title: {
      type: String,
      default: 'Погода в Средиземье'
    },
  },
  
  setup() {
    const weatherData = ref(null);

    weatherData.value = getWeatherData();
    
    return {
      weatherData,
    };
  },

  template: `
    <div>
      <h1 class="title"> {{ title }} </h1>

      <WeatherList
        :weatherData="weatherData"
      />
    </div>
  `,
})
