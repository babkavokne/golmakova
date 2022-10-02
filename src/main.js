import { createApp } from 'vue';
import App from './App.vue';
import Maska from 'maska';
import store from './store/index.js'

import './index.css'
const app = createApp(App);
app.use(Maska);
app.use(store);
app.mount('#app');

