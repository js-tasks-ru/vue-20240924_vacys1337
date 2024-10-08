import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const time = ref(null);
    const interval = ref(null);

    onMounted(() => {
      time.value = new Date().toLocaleTimeString(navigator.language, { 
        timeStyle: 'medium'
      });

      interval.value = setInterval(() => {
        time.value = new Date().toLocaleTimeString(navigator.language, { 
          timeStyle: 'medium'
        });
      }, 1000);
    });

    onUnmounted(() => {
      clearInterval(interval.value);
    });

    return {
      time,
    }
  },

  template: `<div class="clock">{{ time }}</div>`,
})
