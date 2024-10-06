import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(0);
    const secondOperand = ref(0);
    const calculationResult = ref(0);
    const currentOperation = ref(null);

    const calculateResult = () => {
      switch (currentOperation.value) {
        case 'sum':
          calculationResult.value = firstOperand.value + secondOperand.value;
          break;
        case 'subtract':
          calculationResult.value = firstOperand.value - secondOperand.value;
          break;
        case 'multiply':
          calculationResult.value = firstOperand.value * secondOperand.value;
          break;
        case 'divide':
          calculationResult.value = secondOperand.value !== 0
            ? firstOperand.value / secondOperand.value
            : 'Error';
          break;
        default:
          calculationResult.value = 0;
      }
    };

    watch([currentOperation, firstOperand, secondOperand], calculateResult);

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
