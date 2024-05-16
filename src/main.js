import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { FontAwesomeIcon } from './fontawesome';
import PrimeVue from 'primevue/config';

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(PrimeVue, {
    unstyled: true
});
app.mount('#app')
