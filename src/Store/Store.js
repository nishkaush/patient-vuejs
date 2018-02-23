import Vue from 'vue';
import Vuex from 'vuex';
import {
  userModule
} from './Modules/UserModule';

import {
  userSearchModule
} from './Modules/userSearchModule';

import {
  stockModule
} from './Modules/stockModule';


Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    myUrl: "http://localhost:3000",
    // myUrl: "https://intense-castle-52320.herokuapp.com",
  },
  modules: {
    userMod: userModule,
    userSearchMod: userSearchModule,
    stockMod: stockModule
  }
});
