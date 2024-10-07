import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(0);
    const secondOperand = ref(0);
    const currentOperation = ref(null);

    const calculationResult = computed(() => {
      let result = 0;
      switch (currentOperation.value) {
        case 'sum':
          result = firstOperand.value + secondOperand.value;
          break;
        case 'subtract':
          result = firstOperand.value - secondOperand.value;
          break;
        case 'multiply':
          result = firstOperand.value * secondOperand.value;
          break;
        case 'divide':
          result = secondOperand.value !== 0
            ? firstOperand.value / secondOperand.value
            : 'Error';
          break;
      }

      return result;
    });

    return {
      firstOperand,
      secondOperand,
      calculationResult,
      currentOperation,
    };
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="firstOperand" />

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="currentOperation"/>➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="currentOperation"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="currentOperation"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="currentOperation"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="secondOperand"/>

      <div>=</div>

      <output>{{ calculationResult }}</output>
    </div>
  `,
});
