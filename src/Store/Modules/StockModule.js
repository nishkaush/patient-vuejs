import axios from 'axios';
import moment from 'moment';

export const stockModule = {
  namespaced: true,
  state: {
    url: "http://localhost:3000",
    // url: "https://intense-castle-52320.herokuapp.com",
  },
  getters: {},
  mutations: {},
  actions: {
    addNewMedStock(context, payload) {
      return axios.post(`${context.state.url}/stock/add`, payload).then((res) => {
        if (res.data.status === "success") {
          return true;
        }
        return false;
      });
    }
  }
};
