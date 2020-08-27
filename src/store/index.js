import Vue from "vue";
import Vuex from "vuex";
import fetch from "node-fetch";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collectionsRefunds: []
  },
  mutations: {
    UPDATE_COLLECTIONS_REFUNDS(state, ncdorData) {
      state.collectionsRefunds = ncdorData;
    }
  },
  actions: {
    fetchCollectionsRefunds({ commit }) {
      fetch(
        "https://raw.githubusercontent.com/jasonajones73/ncdor/master/data/collections_refunds_test.json"
      )
        .then(function(response) {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }
          response.json().then(function(data) {
            let res = JSON.parse(data);
            let ncdorData = [];
            Object.keys(res).forEach(item => ncdorData.push(res[item]));
            commit("UPDATE_COLLECTIONS_REFUNDS", ncdorData);
          });
        })
        .catch(function(err) {
          console.log("Fetch Error :-S", err);
        });
    }
  },
  modules: {}
});
