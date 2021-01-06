<template>
  <div>
    <div>
      <button
        :disabled="!!alert || hasNewCards('dealer') || hasNewCards('player')"
        @click="hit"
        class="player-controls__btn"
      >
        <div>{{ $t('controls.hit') }}</div>
      </button>
    </div>
    <div>
      <button
        :disabled="!!alert || score('player') === 0"
        @click="stand"
        class="player-controls__btn"
      >
        <div>{{ $t('controls.stand') }}</div>
      </button>
    </div>
    <div>
      <button
        :disabled="!!!alert"
        @click="newGame"
        class="player-controls__btn"
      >
        <div>{{ $t('controls.newGame') }}</div>
      </button>
    </div>
  </div>
</template>

<script>
import timeout from '../mixins/timeout'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'cards',
      'deckCard',
      'hasNewCards',
      'score',
    ]),
    alert: {
      get: function () {
        return this.$store.getters.alert
      },
      set: function (payload) {
        this.$store.dispatch('updateAlert', payload)
      },
    },
    deckCardSuit: {
      get: function () {
        return this.$store.getters.deckCardSuit
      },
      set: function (payload) {
        this.$store.dispatch('updateDeckCardSuit', payload)
      },
    },
    deckCardValue: {
      get: function () {
        return this.$store.getters.deckCardValue
      },
      set: function (payload) {
        this.$store.dispatch('updateDeckCardValue', payload)
      },
    },
    hands: {
      get: function () {
        return this.$store.getters.hands
      },
      set: function (payload) {
        this.$store.dispatch('updateHands', payload)
      },
    },
    stopHit: {
      get: function () {
        return this.$store.getters.stopHit
      },
      set: function (payload) {
        this.$store.dispatch('updateStopHit', payload)
      },
    },
  },
  methods: {
    getCard () {
      if (this.hands.dealer.cards.length + this.hands.player.cards.length > 40) {
        this.deckCardSuit = {}
        this.deckCardValue = {}
        return
      }
      do {
        this.deckCardSuit = this.cards.suits[Math.floor(Math.random() * this.cards.suits.length)]
        this.deckCardValue = this.cards.values[Math.floor(Math.random() * this.cards.values.length)]
      } while (
        this.hands.dealer.cards.some(card => (card.value.name === this.deckCard.value.name && card.suit.name === this.deckCard.suit.name)) ||
        this.hands.player.cards.some(card => (card.value.name === this.deckCard.value.name && card.suit.name === this.deckCard.suit.name))
      )
    },
    async hit () {
      if (this.hands.player.cards.length === 0) {
        for (let i = 0; i < 2; i++) {
          this.getCard()
          this.hands.player.cards.push(this.deckCard)
        }
        await this.timeout(500)
        this.getCard()
        this.hands.dealer.cards.push(this.deckCard)
      } else {
        this.getCard()
        this.hands.player.cards.push(this.deckCard)
      }
      // If player's hand has 21 then stand
      if (this.score('player') === 21) {
        if (
          this.hands.player.cards.length === 2 &&
          this.score('dealer') < 10 &&
          this.hands.dealer.cards.length === 1
        ) {
          this.stopHit = true
        } else {
          await this.timeout(1500)
          this.stand()
        }
      }
    },
    newGame () {
      this.stopHit = false
      this.alert = null

      Object.assign(
        this.hands,
        {
          dealer: {
            cards: [],
          },
          player: {
            cards: [],
          },
        }
      )
    },
    stand () {
      while (
        this.score('dealer') < 17 &&
        !(
          this.score('player') === 21 &&
          this.hands.player.cards.length === 2 &&
          this.hands.dealer.cards.length > 2
        )
      ) {
        this.getCard()
        this.hands.dealer.cards.push(this.deckCard)
      }
      this.stopHit = true
    },
  },
  mixins: [timeout],
  name: "PlayerControls",
};
</script>

<style lang="sass">
.player-controls__btn
  background: white
  border-radius: 10px
  border: 4px solid darkgoldenrod
  box-shadow: 0 0 15px black, inset 0 0 10px black
  margin: 5px
  padding: 0
  width: 100%
  div
    padding: 10px 25px

.player-controls__btn:disabled
  border: 4px solid grey
</style>
