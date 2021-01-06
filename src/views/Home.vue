<template>
  <div class="table">
    <hand-card
      :card="card"
      :index="index"
      :key="'dealer' + index"
      role="dealer"
      v-for="(card, index) in hands.dealer.cards"
    ></hand-card>

    <div class="dealer-score">
      <score role="dealer"></score>
    </div>

    <div class="deck"></div>

    <div class="alert">
      <transition name="fade">
        <h1 v-if="alert && !hasNewCards('dealer') && !hasNewCards('player')">
          {{ alert }}
        </h1>
      </transition>
    </div>

    <hand-card
      :card="card"
      :index="index"
      :key="'player' + index"
      role="player"
      v-for="(card, index) in hands.player.cards"
    ></hand-card>

    <div class="player-score">
      <score role="player"></score>
    </div>

    <div class="player-controls">
      <player-controls></player-controls>
    </div>
  </div>
</template>

<script>
import timeout from '../mixins/timeout'
import { mapGetters } from 'vuex'

export default {
  components: {
    HandCard: () => import('../components/HandCard.vue'),
    PlayerControls: () => import('../components/PlayerControls.vue'),
    Score: () => import('../components/Score.vue'),
  },
  computed: {
    ...mapGetters([
      'deckCard',
      'score',
      'hasNewCards',
      'stopHit',
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
  },
  methods: {
    async animateDealerCards () {
      this.hands.dealer.cards
      .filter(card => !card.active)
      .forEach(async (card, index) => {
        await this.timeout(700 * index)
        card.active = true
        return card
      })
    },
    async animatePlayerCards () {
      this.hands.player.cards
      .filter(card => !card.active)
      .forEach(async (card, index) => {
        await this.timeout(700 * (index + 1))
        card.active = true
        return card
      })
    },
    calculateScore () {
      if (
        this.score('player') === 21 &&
        this.hands.player.cards.length === 2 &&
        this.score('dealer') < 10 &&
        this.hands.dealer.cards.length === 1
      ) {
        this.alert = this.$t('alerts.playerBlackJack')
      } else if (this.score('player') > 21) {
        this.alert = this.$t('alerts.playerLose')
      } else if (
        this.score('dealer') === 21 &&
        this.hands.dealer.cards.length === 2 &&
        !(
          this.score('player') === 21 &&
          this.hands.player.cards.length === 2
        )
      ) {
        this.alert = this.$t('alerts.dealerBlackJack')
      } else if (
        (
          this.score('player') === this.score('dealer') &&
          this.stopHit &&
          !(
            this.score('player') === 21 &&
            this.hands.player.cards.length === 2
          )
        ) || (
          this.score('player') === 21 &&
          this.hands.player.cards.length === 2 &&
          this.score('dealer') === 21 &&
          this.hands.dealer.cards.length === 2
        )
      ) {
        this.alert = this.$t('alerts.push')
      } else if (
        this.score('player') === 21 && this.stopHit
      ) {
        this.alert = this.$t('alerts.playerWin')
        if (this.hands.player.cards.length === 2) {
          this.alert = this.$t('alerts.playerBlackJack')
        }
      } else if (
        this.score('dealer') > 21 ||
        (
          this.score('player') > this.score('dealer') &&
          this.stopHit
        )
      ) {
        this.alert = this.$t('alerts.playerWin')
      } else if (this.score('player') < this.score('dealer') && this.stopHit) {
        this.alert = this.$t('alerts.playerLose')
      }
    },
  },
  mixins: [timeout], 
  name: 'PageHome',
  watch: {
    deckCard () {
      this.calculateScore()
    },
    'hands.dealer.cards': function () {
      this.animateDealerCards()
    },
    'hands.player.cards': function () {
      this.animatePlayerCards()
    },
  },
}
</script>

<style lang="sass" scoped>
.alert
  color: white
  grid-column: 1/4
  left: 0
  position: absolute
  text-align: center
  text-align: center
  top: 27vh
  width: 100%

.dealer-score, .player-score
  color: lightgrey
  left: 40vw
  position: absolute

.dealer-score
  top: 5vh

.deck
  background: lightsteelblue
  border-radius: 5px
  border: 1px solid black
  box-shadow: 1px 1px 0px lightgrey, 2px 2px 0px black, 3px 3px 0px lightgrey, 4px 4px 0px black, 5px 5px 0px lightgrey, 6px 6px 0px black, 7px 7px 0px lightgrey, 8px 8px 0px black, 10px 10px 7px black, 7px 7px 7px black
  height: 88.9px
  left: 75vw
  position: absolute
  top: 3vh
  width: 63.5px

.fade-enter-active
  transition: all 5s 2s

.fade-leave-active
  transition: all 1s

.fade-enter, .fade-leave-to
  opacity: 0
  transform: translateX(100px)

.player-controls
  left: 70vw
  position: absolute
  top: 39vh
  width: 17vw

.player-score
  top: 50vh

.table
  background-color: darkgreen
  background-image: url(data:image/png;base64,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)
  background-size: 100px 100px
  margin: 0 auto
  min-height: 70vh
  position: relative
  text-align: justify
  width: 90vw
</style>
