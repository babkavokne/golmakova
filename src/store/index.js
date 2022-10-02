import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      isPopupVisible: false,
      isResponseVisible: false,
      selectedCity: 'Выберите город',
      options: [
        { id: 1, name: "Москва" },
        { id: 2, name: "Санкт-Петербург" },
        { id: 3, name: "Казань" },
      ],
      response: '',
    }
  },

  mutations: {
    showPopup(state) {
      state.isPopupVisible = true;
    },
    closePopup(state) {
      state.isPopupVisible = false;
    },
    setSelectedCity(state, city) {
      state.selectedCity = state.options.find(el => el.name === city);
    },
    showResponse(state) {
      state.isResponseVisible = true;
    },
    closeResponse(state) {
      state.isResponseVisible = false;
    },
    setResponse(state, response) {
      state.response = response;
    }
  },
});

export default store;