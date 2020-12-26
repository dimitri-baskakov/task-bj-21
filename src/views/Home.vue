<template>
  <div>
    <div class="table">
      <div class="dealer-cards hand">
        <div
          :key="index"
          class="hand__card"
          v-for="(card, index) in hands.dealer.cards"
        >
          <!-- {{ hands.dealer.cards }} -->
          <!-- <transition name="positive"> -->
              <!-- ontouchstart="this.classList.toggle('hover');" -->
              <!-- v-if="card.active" -->
            <div
              class="flip-container"
            >
              <transition name="opposite">
                <div
                  class="card flipper"
                  v-if="card.active"
                >
                  <div class="card__face front">
                    <div
                      class="card__index"
                      v-html="card.value.name + card.suit"
                    ></div>
                    <div
                      class="card__index--inverted"
                      v-html="card.value.name + card.suit"
                    ></div>
                  </div>
                  <div class="card__back back">
                  </div>
                </div>
              </transition>
            </div>
          <!-- </transition> -->
        </div>
      </div>

      <div class="dealer-hand">
        <h2>
          {{ $t('hands.dealer.handLabel') }} :
          <span v-if="!dealerHasNewCards">
            {{ dealerScore }}
          </span>
        </h2>
      </div>

      <div class="card deck">
        <!-- <div v-html='deckCard.value.name + deckCard.suit'></div> -->
      </div>

      <div
        class="alert"
      >
        <h1 v-show="alert && !playerHasNewCards && !dealerHasNewCards">{{ alert }}</h1>
      </div>

      <div class="player-cards hand">
        <div
          :key="index"
          class="hand__card"
          v-for="(card, index) in hands.player.cards"
        >
          <!-- {{ hands.playr.cards }} -->
          <!-- <transition name="positive"> -->
              <!-- ontouchstart="this.classList.toggle('hover');" -->
              <!-- v-if="card.active" -->
            <div
              class="flip-container"
            >
              <transition name="opposite">
                <div
                  class="card flipper"
                  v-if="card.active"
                >
                  <div class="card__face front">
                    <div
                      class="card__index"
                      v-html="card.value.name + card.suit"
                    ></div>
                    <div
                      class="card__index--inverted"
                      v-html="card.value.name + card.suit"
                    ></div>
                  </div>
                  <div class="card__back back">
                  </div>
                </div>
              </transition>
            </div>
          <!-- </transition> -->
        </div>
      </div>

      <div class="player-hand">
        <h2>
          {{ $t('hands.player.handLabel') }} :
          <span v-if="!playerHasNewCards">
            {{ playerScore }}
          </span>
        </h2>
      </div>

      <div class="player-controls">
        <div v-if="!alert">
          <button
            @click="hit"
          >
            {{ $t('controls.hit') }}
          </button>
          <br>
          <button
            @click="stand"
          >
            {{ $t('controls.stand') }}
          </button>
        </div>
        <div>
          <button
            @click="newGame"
          >
            {{ $t('controls.newGame') }}
          </button>
        </div>
      </div>
    </div>

<!--     
    <div
      class="description-image"
    >
      <img
        alt="blackjack description"
        src="@/assets/images/design.png"
      />
    </div>

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>

    <div>
      {{ $t('hands.dealer.cardsLabel') }} ({{ dealerAcesCount }}) :
      <span
        style="margin-right: 5px;"
        :key="index"
        v-for="(card, index) in hands.dealer.cards.map(card => card.value.name + card.suit)"
        v-html="card"
      ></span>
    </div>
    <div>
      {{ $t('hands.player.cardsLabel') }} ({{ playerAcesCount }}) :
      <span
        style="margin-right: 5px;"
        :key="index"
        v-for="(card, index) in hands.player.cards.map(card => card.value.name + card.suit)"
        v-html="card"
      ></span>
    </div>

    <br>

    <div>{{ $t('hands.dealer.handLabel') }} : {{ dealerScore }}</div>
    <div>{{ $t('hands.player.handLabel') }} : {{ playerScore }}</div>

    <br>

    <div v-if="!alert">
      <button
        @click="hit"
      >
        {{ $t('controls.hit') }}
      </button>
      <br>
      <button
        @click="stand"
      >
        {{ $t('controls.stand') }}
      </button>
    </div>
    <div>
      <button
        @click="newGame"
      >
        {{ $t('controls.newGame') }}
      </button>
    </div>
    <div
      class="alert"
      v-if="alert"
    >
      {{ alert }}
    </div> -->
  </div>
</template>

<script>
export default {
  beforeDestroy() {
  },
  components: {
  },
  computed: {
    dealerAcesCount: function () {
      return this.hands.dealer.cards.reduce((acc, curr) => acc + ((curr.value.name === 'A') && 1) || 0, 0)
    },
    dealerCards: function () {
      return this.hands.dealer.cards.map(card => card.value.name + card.suit)
    },
    dealerHasNewCards: function () {
      return this.hands.dealer.cards.some(card => !card.active)
    },
    dealerScore: function () {
      return this.getScore('dealer')
    },
    deckCard: function () {
      return {
        value: this.deckCardValue,
        suit: this.deckCardSuit,
        active: false,
      }
    },
    playerAcesCount: function () {
      return this.hands.player.cards.reduce((acc, curr) => acc + ((curr.value.name === 'A') && 1) || 0, 0)
    },
    playerCards: function () {
      return this.hands.player.cards.map(card => card.value.name + card.suit)
    },
    playerHasNewCards: function () {
      return this.hands.player.cards.some(card => !card.active)
    },
    playerScore: function () {
      return this.getScore('player')
    },
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
    }
  },
  methods: {
    async animateDealerCards () {
      this.hands.dealer.cards
      .filter(card => !card.active)
      .forEach(async (card, index) => {
        await this.timeout(500 * (index + 1))
        card.active = true
        return card
      })
    },
    async animatePlayerCards () {
      this.hands.player.cards
      .filter(card => !card.active)
      .forEach(async (card, index) => {
        await this.timeout(500 * (index + 1))
        card.active = true
        return card
      })
    },
    calculateScore () {
      if (
        this.playerScore === 21 &&
        this.hands.player.cards.length === 2 &&
        this.dealerScore < 10 &&
        this.hands.dealer.cards.length === 1
      ) {
        this.alert = 'You win! Black Jack!!!'
      } else if (this.playerScore > 21) {
        this.alert = 'You loose!'
      } else if (
        this.dealerScore === 21 &&
        this.hands.dealer.cards.length === 2 &&
        !(
          this.playerScore === 21 &&
          this.hands.player.cards.length === 2
        )
      ) {
        this.alert = 'You loose! Dealer\'s Black Jack!!!'
      } else if (
        (
          this.playerScore === this.dealerScore &&
          this.stopHit &&
          !(
            this.playerScore === 21 &&
            this.hands.player.cards.length === 2
          )
        ) || (
          this.playerScore === 21 &&
          this.hands.player.cards.length === 2 &&
          this.dealerScore === 21 &&
          this.hands.dealer.cards.length === 2
        )
      ) {
        this.alert = 'Push! No one wins.'
      } else if (
        this.playerScore === 21 && this.stopHit
      ) {
        this.alert = 'You win!'
        if (this.hands.player.cards.length === 2) {
          this.alert = 'You win! Black Jack!!!'
        }
      } else if (this.dealerScore > 21) {
        this.alert = 'You win!'
      } else if (this.playerScore > this.dealerScore && this.stopHit) {
        this.alert = 'You win!'
      } else if (this.playerScore < this.dealerScore && this.stopHit) {
        this.alert = 'You loose!'
      }
    },
    getCard () {
      if ((this.hands.dealer.cards.length + this.hands.player.cards.length) > 40) {
        this.deckCardSuit = {}
        this.deckCardValue = {}
        return
      }
      do {
        this.deckCardSuit = this.cards.suits[Math.floor(Math.random() * this.cards.suits.length)]
        this.deckCardValue = this.cards.values[Math.floor(Math.random() * this.cards.values.length)]
      } while (
        this.hands.dealer.cards.some(card => (card.value.name === this.deckCard.value.name && card.suit === this.deckCard.suit)) ||
        this.hands.player.cards.some(card => (card.value.name === this.deckCard.value.name && card.suit === this.deckCard.suit))
      )
    },
    getScore (role) {
      let score = this.hands[role].cards.reduce((acc, curr) => acc + curr.value.worth, 0)
      let acesCount = this.hands[role].cards.reduce((acc, curr) => acc + ((curr.value.name === 'A') && 1) || 0, 0)
      while (acesCount > 0 && score > 21) {
        acesCount--
        score -= 10
      }
      return score
    },
    hit () {
      if (this.hands.player.cards.length === 0) {
        for (let i = 0; i < 2; i++) {
          this.getCard()
          this.hands.player.cards.push(this.deckCard)
        }
        this.getCard()
        this.hands.dealer.cards.push(this.deckCard)
      } else {
        this.getCard()
        this.hands.player.cards.push(this.deckCard)
      }
      // If player hand has 21 then stand
      if (this.playerScore === 21) {
        if (
          this.hands.player.cards.length === 2 &&
          this.dealerScore < 10 &&
          this.hands.dealer.cards.length === 1
        ) {
          this.stopHit = true
        } else {
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
        this.dealerScore < 17 &&
        !(
          this.playerScore === 21 &&
          this.hands.player.cards.length === 2 &&
          this.hands.player.cards.length > 2
        )
      ) {
        this.getCard()
        this.hands.dealer.cards.push(this.deckCard)
      }
      this.stopHit = true
    },
    timeout (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
  },
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
    // stopHit () {
    //   this.calculateScore()
    // },
  },
}
</script>

<style lang="sass" scoped>
.alert
  color: white
  grid-column: 1/4
  text-align: center

.dealer-hand, .player-hand
  color: lightgrey
  
.card
  height: 88.9px
  width: 63.5px

.card__face
  background: white
  display: grid
  padding: 2px
  height: 100%
  width: 100%
  border-radius: 5px
  border: 1px solid black
  box-shadow: 1px 1px 1px black, 1px 1px 5px darkgrey
  
.card__back
  background: lightsteelblue
  display: grid
  padding: 2px
  height: 100%
  width: 100%
  border-radius: 5px
  border: 1px solid black
  box-shadow: 1px 1px 1px black, 1px 1px 5px darkgrey

.card__index--inverted
  transform: rotate(180deg)

.dealer-cards
  // display: grid

.deck
  background: lightsteelblue
  border-radius: 5px
  border: 1px solid black
  box-shadow: 1px 1px 0px lightgrey, 2px 2px 0px black, 3px 3px 0px lightgrey, 4px 4px 0px black, 5px 5px 0px lightgrey, 6px 6px 0px black, 7px 7px 0px lightgrey, 8px 8px 0px black
  position: relative

.description-image img
  width: 50%

.hand
  // display: grid
  // grid-auto-columns: repeat(20px)
  position: relative
  padding-left: 35px

.hand__card
  left: -5px
  margin-left: -35px
  position: relative
  z-index: 1
  display: inline-block

.table
  padding: 50px
  display: grid
  grid-auto-rows: minmax(100px, auto)
  grid-column-gap: 20px
  grid-template-columns: repeat(3, 1fr)
  margin: 0 auto
  max-width: 1200px
  position: relative
  text-align: justify
  width: 90vw
  background-image: url(data:image/png;base64,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)
  background-color: darkgreen
</style>

<style lang="sass" scoped>
/* animations */

/* entire container, keeps perspective */
.flip-container
  perspective: 800px

/* flip the pane when hovered */
// .flip-container:hover .flipper, .flip-container.hover .flipper
//   transform: rotateY(180deg)

.flip-container
  height: 90px
  width: 65px
  padding: 2px

/* flip speed goes here */
.flipper
  transition: 0.6s
  transform-style: preserve-3d
  position: relative

/* hide back of pane during swap */
.front, .back
  backface-visibility: hidden
  position: absolute
  top: 0
  left: 0

/* front pane, placed above back */
.front
  z-index: 2
  /* for firefox 31 */
  transform: rotateY(0deg)

/* back, initially hidden pane */
.back
  transform: rotateY(180deg)

.fade-enter-active, .fade-leave-active
  transition: all 0.5s
  transform: translateX(100px)

.fade-enter, .fade-leave-to
  // opacity: 0

.positive-enter-active
  animation: positive 0.1s

.opposite-enter-active
  animation: opposite 1.5s

@keyframes positive
  0%
    transform: translate3d(1500px, 0, 0)
    // transform: rotateY(180deg)
  // 25%
  //   transform: translate3d(0, 0px, 0)
  // 50%
    // transform: translate3d(50px, 0, 0)
    // transform: rotateY(30deg)
  // 75%
  //   transform: translate3d(0, -20px, 0)
  100%
    transform: translate3d(0, 0, 0)
    // .flip-container .flipper
    // transform: rotateY(180deg)

@keyframes opposite
  0%
    transform: rotateY(180deg)
  // 25%
  //   transform: rotateY(0deg)
  // 50%
  //   transform: rotateY(0deg)
  // 75%
  //   transform: translate3d(0, -20px, 0)
  100%
    transform: rotateY(0deg)
</style>
