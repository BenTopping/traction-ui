import Vuex from 'vuex';
import Vue from 'vue';
import Api from '@/api'
import buildRequest from '@/api/BuildRequest'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    traction: buildRequest(Api.Config.traction),
    sequencescape: buildRequest(Api.Config.sequencescape),
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    sequencescape: state => state.sequencescape,
    traction: state => state.traction,
  }
})
