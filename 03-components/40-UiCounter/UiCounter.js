import { defineComponent, computed } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',
  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
    }
  },

  setup(props, { emit }) {
    const handleDecrementAction = () => {
      emit('update:count', props.count - 1);
    }

    const handleIncrementAction = () => {
      emit('update:count', props.count + 1);
    }

    const disabledIncrement = computed(() => {
      return props.count >= props.max;
    });

    const disabledDecrement = computed(() => {
      return props.count <= props.min;
    });

    return {
      disabledIncrement,
      disabledDecrement,
      handleDecrementAction,
      handleIncrementAction,
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="disabledDecrement" @click="handleDecrementAction">➖</UiButton>
      <span class="count" data-testid="count"> {{ count }} </span>
      <UiButton aria-label="Increment" :disabled="disabledIncrement" @click="handleIncrementAction">➕</UiButton>
    </div>
  `,
})
