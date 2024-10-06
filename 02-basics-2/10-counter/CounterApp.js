import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',
  setup() {
    const counterConfig = {
      minValue: 0,
      maxValue: 5,
    };

    const counterValue = ref(0);

    const incrementCounterValue = () => {
      if (counterValue.value < counterConfig.maxValue) {
        counterValue.value++;
      }
    }

    const decrementCounterValue = () => {
      if (counterValue.value > counterConfig.minValue) {
        counterValue.value--;
      }
    }

    return {
      counterConfig,
      counterValue,
      incrementCounterValue,
      decrementCounterValue,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        @click="decrementCounterValue"
        :disabled="counterValue <= counterConfig.minValue"
      >➖</button>

      <span class="count" data-testid="count">{{ counterValue }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        @click="incrementCounterValue"
        :disabled="counterValue >= counterConfig.maxValue"
      >➕</button>
    </div>
  `,
})
