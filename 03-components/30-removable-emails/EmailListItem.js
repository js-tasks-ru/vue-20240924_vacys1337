import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailListItem',
  
  props: {
    email: {
      type: String,
      required: true,
    },

    marked: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['email-delete'],

  setup(props, { emit }) {
    const handleDeleteAction = () => {
      emit('email-delete');
    }

    return {
      handleDeleteAction,
    }
  },

  template: `
    <li :class="{ marked }">
      {{ email }}
      <button type="button" aria-label="Удалить" @click.stop="handleDeleteAction">❌</button>
    </li>
  `,
})
