import axios from 'axios';
import moment from 'moment';

export const userSearchModule = {
  namespaced: true,
  state: {
    url: "https://intense-castle-52320.herokuapp.com",
    currentView: "searchbar",
    patientToEdit: "",
    originalDob: ""
  },


  getters: {
    currentOpd(state) {
      return state.patientToEdit.medicalHistory.opdFee;
    }
  },


  mutations: {
    changeCurrentView(state, payload) {
      state.patientToEdit = payload.patientToEdit;
      state.originalDob = payload.patientToEdit.dob; //holding original dob so it can be used in editing
      state.currentView = payload.value;
    },
    setDobEdit(state, payload) {
      state.patientToEdit.dob = payload.dobEdit;
    },
    newSearch(state) {
      state.currentView = "searchbar";
      state.patientToEdit = "";
    },
    issueDateFormat(state) {
      state.patientToEdit.medicalHistory.forEach((e) => {
        e.issuedAt = moment(e).format('Do MMM YYYY');
      });
    }
  },


  actions: {
    getPatients(context, payload) {
      return axios.get(`${context.state.url}/user/search/${payload.searchTerm}`).then((res) => {
        if (res.data.found) {
          return {
            found: true,
            arr: res.data.arr
          };
        }
        return {
          arr: [{
            name: "No Results"
          }]
        }
      }).catch((e) => {
        console.log(e);
      });
    },
    updatePatient(context, payload) {
      return axios.post(`${context.state.url}/user/updatePersonal`, payload).then((res) => {
        if (res.data.update === 'success') {
          context.state.patientToEdit = res.data.updatedPatient;
          return true;
        }
        return false;
      }).catch((e) => {
        console.log(e);
        return false;
      });
    },
    newPrescription(context, payload) {
      return axios.post(`${context.state.url}/user/addPrescription`, payload).then((res) => {
        if (res.data.update === 'success') {
          context.state.patientToEdit = res.data.updatedPatient;
          context.commit("issueDateFormat");
          return true;
        }
        console.log(res.data);
        return false;
      }).catch((e) => {
        console.log(e);
        return false;
      });
    },
    deletePatient(context, payload) {
      return axios.post(`${context.state.url}/user/deletePatient`, payload).then((res) => {
        if (res.data.update === "success") {
          return true;
        } else {
          return false;
        }
      });
    }

  }
}
