<template>
  <div class="relative">
    <div class="max-w-7xl md:max-w-2xl mx-auto px-2.5 mt-5 usm:mt-2.5 flex flex-wrap gap-x-4 gap-y-2.5 drop-shadow-sm">
      <MyButton @click="showPopup" class="bg-blue-500" text="Заказать в Москву" value="Москва" />
      <MyButton @click="showPopup" class="bg-teal-600" text="Заказать в Санкт-Петербург" value="Санкт-Петербург" />
    </div>
    <Popup @click="closePopup" v-if="isPopupVisible">
      <h1 class="mb-6">Заказать звонок</h1>
      <form class="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 usm:flex flex-col">
        <MyInput :invalid="nameInvalid" @input="changeInfo" type="text" name="name" label="Имя" id="name"
          required="true" placeholder="Иван Иванов" class="md:order-2" />
        <MyInput :invalid="phoneInvalid" @input="changeInfo" v-maska="'+7 (###) ###-##-##'" type="text" name="phone"
          label="Телефон" required="true" placeholder="+7 (___) ___-__-__" class="md:order-1" />
        <MyInput :invalid="emailInvalid" @input="changeInfo" type="email" name="email" label="Email" required="true"
          placeholder="you@example.com" class="md:order-3" />
        <MySelect @selected="changeCity" label="Город" required="true" :selected="defaultSelected" :options="options"
          class="sm:col-span-1 md:col-span-2 md:order-4" />
        <MyButton @click="sendForm" text="Отправить"
          class="bg-green-600 col-start-4 md:col-start-3 sm:col-start-2 self-end md:order-5" />
      </form>
    </Popup>
    <Popup @click="closeResponse" v-if="isResponseVisible">
      <div v-html="response"></div>
    </Popup>
  </div>

</template>

<script setup>
import axios from 'axios';

import { computed, ref } from "vue";
import { useStore } from "vuex";

import MyButton from "../components/MyButton.vue";
import Popup from "../components/Popup.vue";
import MyInput from '../components/MyInput.vue';
import MySelect from '../components/MySelect.vue';

const store = useStore();

const isPopupVisible = computed(() => store.state.isPopupVisible);
const defaultSelected = computed(() => store.state.selectedCity);
const options = computed(() => store.state.options);
const isResponseVisible = computed(() => store.state.isResponseVisible);
const response = computed(() => store.state.response);

const formInfo = ref({
  name: '',
  phone: '',
  email: '',
  city_id: ''
})

const nameInvalid = ref(false)
const phoneInvalid = ref(false)
const emailInvalid = ref(false)

function showPopup(e) {
  store.commit("setSelectedCity", e.target.value);
  store.commit("showPopup");
}

function closePopup() {
  store.commit('closePopup');
}

// function showPopup(e) {
//   store.commit("setSelectedCity", e.target.value);
//   store.commit("showPopup");
// }

function closeResponse() {
  store.commit('closeResponse');
}

function changeInfo(e) {
  if (e.target.name === "phone") {
    formInfo.value[e.target.name] = "+7" + e.target.dataset.maskRawValue;
  } else {
    formInfo.value[e.target.name] = e.target.value;
  }
  console.log(formInfo.value);
}

function changeCity(e) {
  formInfo.value.city_id = e.id
  console.log(formInfo.value);
}

function validateForm(form) {

  form.value.name.length < 10 ? nameInvalid.value = true : nameInvalid.value = false;

  form.value.phone.length < 12 ? phoneInvalid.value = true : phoneInvalid.value = false;

  if (form.value.email.length < 12 || (!form.value.email.includes('.com') || !form.value.email.includes('@'))) {
    emailInvalid.value = true;
  } else {
    emailInvalid.value = false;
  }

  return !nameInvalid.value && !phoneInvalid.value && !emailInvalid.value
}

async function sendForm(e) {
  if (validateForm(formInfo)) {
    const res = await axios.post('http://hh.autodrive-agency.ru/test-tasks/front/task-7/', formInfo.value)
    console.log(res.data);
    store.commit('closePopup');
    store.commit('setResponse', res.data);
    store.commit('showResponse');
  }
}
</script>

<style lang="sass" scoped>
</style>