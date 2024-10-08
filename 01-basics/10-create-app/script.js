import { defineComponent, createApp } from 'vue'

const simpleComponent = defineComponent({
    name: 'DateComponent',
    setup() {
        const dateString = new Date().toLocaleDateString(navigator.language, { 
            dateStyle: 'long' 
        });

        return {
            dateString,
        }
    },

    template: `
        <div>Сегодня {{ dateString }}</div>
    `
})

const app = createApp(simpleComponent);
app.mount('#app');