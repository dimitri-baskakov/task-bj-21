<template>
  <div>
    <!-- <div>Последняя взятая карта в колоде : {{ deckCard }}</div> -->
    <!-- <div>{{ $t('hands.dealer.handLabel') }} : {{ hands.dealer.cards.length }}</div>
    <div>{{ $t('hands.player.handLabel') }} : {{ hands.player.cards }}</div> -->

    <div
      style="outline: 1px solid red; text-align: center; width: 100%;"
    >
      {{ alert }}
    </div>
    <div>
      {{ $t('hands.dealer.handLabel') }} :
      <span
        style="margin-right: 5px;"
        :key="index"
        v-for="(card, index) in hands.dealer.cards.map(card => card.value.name + card.suit)"
        v-html="card"
      ></span>
    </div>
    <div>
      {{ $t('hands.player.handLabel') }} :
      <span
        style="margin-right: 5px;"
        :key="index"
        v-for="(card, index) in hands.player.cards.map(card => card.value.name + card.suit)"
        v-html="card"
      ></span>
    </div>
    <div>{{ $t('hands.dealer.handLabel') }} : {{ dealerScore }}</div>
    <div>{{ $t('hands.player.handLabel') }} : {{ playerScore }}</div>
    <div v-if="!alert">
      <button
        @click="hit"
      >
        {{ $t('actions.player.hit') }}
      </button>
      <br>
      <button
        @click="stand"
      >
        {{ $t('actions.player.stand') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  beforeDestroy() {
  },
  components: {
  },
  computed: {
    dealerScore: function () {
      return this.getScore('dealer')
    },
    deckCard: function () {
      return {
        value: this.deckCardValue,
        suit: this.deckCardSuit,
      }
    },
    playerScore: function () {
      return this.getScore('player')
    },
  },
  async created() {
  },
  data() {
    return {
      alert: null,
      cards: {
        suits: [
          '&clubs;',
          '&diams;',
          '&hearts;',
          '&spades;',
        ],
        values: [
          // { name: '2', worth: [2]},
          // { name: '3', worth: [3]},
          // { name: '4', worth: [4]},
          // { name: '5', worth: [5]},
          // { name: '6', worth: [6]},
          // { name: '7', worth: [7]},
          // { name: '8', worth: [8]},
          // { name: '9', worth: [9]},
          // { name: '10', worth: [10]},
          // { name: 'J', worth: [10]},
          // { name: 'Q', worth: [10]},
          // { name: 'K', worth: [10]},
          // { name: 'A', worth: [11, 1]},
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
      }
    }
  },
  methods: {
    getCard () {
      if ((this.hands.dealer.cards.length + this.hands.player.cards.length) > 40) {
        this.deckCardSuit = {}
        this.deckCardValue = {}
        return
      }
      do {
        this.deckCardSuit = this.cards.suits[Math.floor(Math.random() * this.cards.suits.length)]
        this.deckCardValue = this.cards.values[Math.floor(Math.random() * this.cards.values.length)]
      }
      while (
        this.hands.dealer.cards.some(card => (card.value.name === this.deckCard.value.name && card.suit === this.deckCard.suit)) ||
        this.hands.player.cards.some(card => (card.value.name === this.deckCard.value.name && card.suit === this.deckCard.suit))
      )
    },
    getScore (role) {
      let score = this.hands[role].cards.reduce((acc, curr) => acc + curr.value.worth, 0)
      let aces = this.hands[role].cards.reduce((acc, curr) => acc + (curr.value.name === 'A') && 1 || 0, 0)
      while (aces > 0 && score > 21) {
        aces--
        score -= 10
      }
      return score
    },
    hit () {
      this.getCard()
      this.hands.player.cards.push(this.deckCard)
    },
    stand () {
      this.getCard()
      this.hands.dealer.cards.push(this.deckCard)
    },
  },
  name: "PageHome",
  watch: {
    deckCard () {
      if (this.playerScore > 21) {
        this.alert = "You loose!"
      } else if (this.playerScore === this.dealerScore) {
        this.alert = "Push!"
      } else if (this.playerScore === 21) {
        this.alert = 'You win!'
        if (this.hands.player.cards.length === 2) {
          this.alert = 'You win! Black Jack!!!'
        }
      } else if (this.dealerScore > 21) {
        this.alert = "You win!"
      } else if (this.playerScore > this.dealerScore) {
        // this.alert = "You win!"
      } else if (this.playerScore < this.dealerScore) {
        // this.alert = "You loose!"
      }
      // if (newScore === 21) {
      //   this.alert = 'You loose!'
      //   if (this.hands.player.cards.length === 2) {
      //     this.alert = 'You loose! Dealer Black Jack!!!'
      //   }
      // } else if (newScore > 21) {
      //   this.alert = "You win!"
      // }
      // if (this.dealerScore > this.playerScore) {
      //   this.alert = "You loose!"
      // }
    },
    // dealerScore (newScore) {
    //   if (newScore === 21) {
    //     this.alert = 'You loose!'
    //     if (this.hands.player.cards.length === 2) {
    //       this.alert = 'You loose! Dealer Black Jack!!!'
    //     }
    //   } else if (newScore > 21) {
    //     this.alert = "You win!"
    //   }
    //   if (this.dealerScore > this.playerScore) {
    //     this.alert = "You loose!"
    //   }
    // },
    // playerScore (newScore) {
    //   if (newScore === 21) {
    //     this.alert = 'You win!'
    //     if (this.hands.player.cards.length === 2) {
    //       this.alert = 'You win! Black Jack!!!'
    //     }
    //   } else if (newScore > 21) {
    //     this.alert = "You loose!"
    //   }
    // },
  },
}
</script>

<style lang="sass">
</style>
