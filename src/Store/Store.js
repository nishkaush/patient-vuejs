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
  modules: {
    userMod: userModule,
    userSearchMod: userSearchModule,
    stockMod: stockModule
  }
});
