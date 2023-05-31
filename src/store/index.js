import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chips: window.gameClockData.cso.chips,
    blinds: window.gameClockData.bso.blinds,
    name: window.gameClockData.name,

    currentTime: 0,
    chipIndex: 0,
    paused: true,
    muted: false,
    oneTime: false,
  },
  getters: {
    chipIndex: (state) => {
      return state.chipIndex;
    },
    currentBlind: (state /*, getters*/) => {
      const time = Math.floor(state.currentTime / 60);
      let tempTime = 0;
      for (let i = 0; i < state.blinds.length; i++) {
        if (state.blinds[i].startTime + tempTime > time) {
          return state.blinds[i];
        } else {
          tempTime += state.blinds[i].startTime;
        }
      }
      return state.blinds[state.blinds.length - 1];
    },
    remainingBlinds: (state, getters) => {
      const blinds = state.blinds;
      const id = getters.currentBlind.id;
      for (let i = 0; i < blinds.length; i++) {
        if (blinds[i].id == id) {
          return blinds.slice(i + 1, blinds.length);
        }
      }
      return [];
    },
    timeRemainingThisBlind: (state, getters) => {
      const blinds = state.blinds;
      if (getters.currentBlind.id == blinds[blinds.length - 1].id) return 0; //this is the last blind, there is no next blind.

      let remainder = state.currentTime;
      for (let i = 0; i < state.blinds.length; i++) {
        const blind = blinds[i];
        if (blind.startTime < remainder / 60) remainder -= blind.startTime * 60;
        else return blind.startTime * 60 - remainder;
      }
      return 0;
    },
    timeOfNextBlind: (state, getters) => {
      const blinds = state.blinds;
      const id = getters.currentBlind.id;
      let timeTally = 0;
      if (id == blinds[blinds.length - 1].id) return state.currentTime;

      for (let i = 0; i < blinds.length; i++) {
        timeTally += blinds[i].startTime;
        if (blinds[i].id == id) {
          return timeTally * 60 + 1;
        }
      }
      return 0; //should never reach
    },
    timeOfPreviousBlind: (state, getters) => {
      const blinds = state.blinds;
      const id = getters.currentBlind.id;
      let timeTally = 0;
      if (id == blinds[0].id) return 0; //first blind starts at 0

      for (let i = 0; i < blinds.length; i++) {
        if (blinds[i + 1].id == id) {
          return timeTally * 60 + 1;
        }
        timeTally += blinds[i].startTime;
      }
      return 0; //should never reach
    },
  },
  mutations: {
    setCurrentTime(state, payload) {
      state.currentTime = payload;
    },
    increaseChipIndex(state) {
      state.chipIndex = Math.max(0, state.chipIndex - 1);
    },
    reduceChipIndex(state) {
      state.chipIndex = Math.min(state.chips.length, state.chipIndex + 1);
    },
    togglePaused(state) {
      state.paused = !state.paused;
    },
    toggleMuted(state) {
      state.muted = !state.muted;
    },
  },
  actions: {},
  modules: {},
});
