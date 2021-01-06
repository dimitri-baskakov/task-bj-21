import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alert: null,
    cards: {
      suits: [
        { name: '&clubs;', color: 'black'},
        { name: '&diams;', color: 'red'},
        { name: '&hearts;', color: 'red'},
        { name: '&spades;', color: 'black'},
      ],
      values: [
        { name: '2', worth: 2},
        { name: '3', worth: 3},
        { name: '4', worth: 4},
        { name: '5', worth: 5},
        { name: '6', worth: 6},
        { name: '7', worth: 7},
        { name: '8', worth: 8},
        { name: '9', worth: 9},
        { name: '10', worth: 10},
        { name: 'J', worth: 10},
        { name: 'Q', worth: 10},
        { name: 'K', worth: 10},
        { name: 'A', worth: 11},
      ],
    },
    deckCardSuit: '',
    deckCardValue: '',
    hands: {
      dealer: {
        cards: [],
      },
      player: {
        cards: [],
      },
    },
    stopHit: false,
  },
  mutations: {
    updateAlert(state, payload) {
      state.alert = payload
    },
    updateDeckCardSuit(state, payload) {
      state.deckCardSuit = payload
    },
    updateDeckCardValue(state, payload) {
      state.deckCardValue = payload
    },
    updateHands(state, payload) {
      state.hands = payload
    },
    updateStopHit(state, payload) {
      state.stopHit = payload
    },
  },
  actions: {
    updateAlert({ commit }, payload) {
      commit('updateAlert', payload)
    },
    updateDeckCardSuit({ commit }, payload) {
      commit('updateDeckCardSuit', payload)
    },
    updateDeckCardValue({ commit }, payload) {
      commit('updateDeckCardValue', payload)
    },
    updateHands({ commit }, payload) {
      commit('updateHands', payload)
    },
    updateStopHit({ commit }, payload) {
      commit('updateStopHit', payload)
    },
  },
  getters: {
    alert: state => state.alert,
    cards: state => state.cards,
    deckCard: state => {
      return {
        value: state.deckCardValue,
        suit: state.deckCardSuit,
        active: false,
      }
    },
    deckCardSuit: state => state.deckCardSuit,
    deckCardValue: state => state.deckCardValue,
    hands: state => state.hands,
    hasNewCards: state => role => state.hands[role].cards.some(card => !card.active),
    score: state => role => {
      let score = state.hands[role].cards.reduce(
        (acc, curr) => acc + curr.value.worth, 0
      )
      let acesCount = state.hands[role].cards.reduce(
        (acc, curr) => acc + ((curr.value.name === 'A') && 1) || 0, 0
      )
      while (acesCount > 0 && score > 21) {
        acesCount--
        score -= 10
      }
      return score
    },
    stopHit: state => state.stopHit,
  },
  modules: {}
});
