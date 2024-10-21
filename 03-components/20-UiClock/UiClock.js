import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const time = ref(null);
    let interval;

    onMounted(() => {
      time.value = new Date().toLocaleTimeString(navigator.language, { 
        timeStyle: 'medium'
      });

      interval = setInterval(() => {
        time.value = new Date().toLocaleTimeString(navigator.language, { 
          timeStyle: 'medium'
        });
      }, 1000);
    });

    onUnmounted(() => {
      clearInterval(interval);
    });

    return {
      time,
    }
  },

  template: `<div class="clock">{{ time }}</div>`,
})
