import axios from 'axios';

export const userModule = {
  namespaced: true,


  state: {
    url: "http://localhost:3000",
    // url: "https://intense-castle-52320.herokuapp.com",
    opdNumber: "",
    currentComp: "",
    patientNumber: "",
    form: {
      name: "",
      phone: null,
      address: "",
      email: "",
      opd: "",
      photoId: "",
      dob: null,
      gender: "",
      patientType: ""
    },
    diagData: "",
    medData: [],
    testData: [],
    allMedListDB: []
  },


  getters: {
    opdCalc(state) {
      if (state.form.patientType === 'abl') {
        return 10;
      }
      return;
    }
  },


  mutations: {
    settingUpAllMedList(state, payload) {
      state.allMedListDB = payload.allMedListDB;
    },
    internalUpdateAllMedList(state, payload) {
      state.allMedListDB.forEach((e) => {
        if (e.name === payload.name) {
          e.currentStock -= payload.qty;
        }
      });
    },
    internalIncreaseAllMedList(state, payload) {
      state.allMedListDB.forEach((e) => {
        if (e.name === payload.name) {
          e.currentStock += payload.qty;
        }
      });
    },
    setDob(state, payload) {
      state.form.dob = payload.dob;
    },
    setDiagData(state, payload) {
      state.diagData = payload.value;
    },
    showCurrentView(state, payload) {
      state.currentComp = payload.value;
      if (payload.form) {
        state.form = payload.form;
        state.form.opd = payload.opd;
      } else if (payload.diagData) {
        state.diagData = payload.diagData;
      } else if (payload.medData) {
        state.medData = payload.medData;
        state.allMedListDB = payload.allMedListDB;
      } else if (payload.testData) {
        state.testData = payload.testData;
      }
    },
    setDefaultVuex(state) {
      state.form = {
        name: "",
        phone: null,
        address: "",
        email: "",
        opd: "",
        photoId: "",
        dob: null,
        gender: "",
        patientType: ""
      };
      state.currentComp = "userMainForm";
      state.diagData = "";
      state.medData = [];
      state.testData = [];
      state.patientNumber = "";
    }
  },

  actions: {
    getAllMedicinesFromDB(context) {
      axios.get(`${context.state.url}/stock/getAllMedicines`).then((res) => {
        if (res.data.status === "success") {
          context.commit("settingUpAllMedList", {
            allMedListDB: res.data.allMedList
          });
        }
      });
    },
    checkExisting(context, payload) {
      return axios.post(`${context.state.url}/user/checkExisting`, {
        name: payload.name,
        phone: payload.phone
      }).then((res) => {
        if (res.data.found) {
          return {
            found: true
          };
        }
        return {
          found: false
        };
      });
    },
    submitToDatabase(context, payload) {
      axios.post(`${context.state.url}/user/add`, context.state).then((res) => {
        if (res.data.saved) {
          console.log(res.data.opdNumber);
          context.state.patientNumber = res.data.patientNumber;
          context.state.opdNumber = res.data.opdNumber;
        } else {
          context.state.patientNumber = res.data.patientNumber;
        }
      });
    }
  }
}
