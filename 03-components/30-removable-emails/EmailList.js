import { defineComponent } from 'vue'
import EmailListItem from './EmailListItem.js'

export default defineComponent({
  name: 'EmailList',

  components: {
    EmailListItem,
  },

  props: {
    emails: {
      type: Array,
      required: true,
    },
  },

  emits: ['delete-email'],

  setup(props, { emit }) {
    const onDelete = (index) => {
      emit('delete-email', index);
    }

    return {
      onDelete,
    }
  },

  template: `
    <ul class="emails-list unstyled-list" aria-label="Emails">
      <EmailListItem
        v-for="({ email, isMarked }, index) in emails"
        :key="email"
        :email="email"
        :marked="isMarked"
        :index="index"
        @email-delete="onDelete(index)"
      />
    </ul>
  `,
})
