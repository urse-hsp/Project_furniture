import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
    goods:[]
};

const getters = {
  acquireGoods(){
    return state.goods;
  }
};

const mutations = {

};

const actions = {

};

const store = new Vuex.Store({
  state,getters,mutations,actions
});

export default store;

