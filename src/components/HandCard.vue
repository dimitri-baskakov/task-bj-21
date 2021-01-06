<template>
  <div
    class="hand__card"
  >
    <transition name="move">
      <div
        :class="`flip-container--${role}`"
        :style="`left: calc(5vw + ${30 * index}px);`"
        class="flip-container"
        v-if="card.active"
      >
        <div
          :class="{'opposite': card.active}"
          class="card flipper"
          v-if="card.active"
        >
          <div
            :style="`color: ${card.suit.color}`"
            class="card__face front"
          >
            <div
              class="card__index"
              v-html="card.value.name + card.suit.name"
            ></div>
            <div
              class="card__index--inverted"
              v-html="card.value.name + card.suit.name"
            ></div>
          </div>

          <div class="card__back back"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "HandCard",
  props: {
    card: Object,
    index: Number,
    role: String,
  },
};
</script>

<style lang="sass">
.back
  transform: rotateY(180deg)

.back, .front
  backface-visibility: hidden
  position: absolute
  top: 0
  left: 0

.card
  height: 88.9px
  width: 63.5px

.card__back
  background: lightsteelblue
  border-radius: 5px
  border: 1px solid black
  box-shadow: 1px 1px 1px black, 1px 1px 10px dimgrey
  display: grid
  height: 100%
  width: 100%

.card__face
  background: white
  border-radius: 5px
  border: 1px solid black
  box-shadow: 1px 1px 1px black, 1px 1px 7px black
  display: grid
  height: 100%
  width: 100%

.card__index
  padding: 2px

.card__index--inverted
  padding: 2px
  transform: rotate(180deg)

.flip-container
  height: 88.9px
  perspective: 800px
  position: absolute
  width: 63.5px
  z-index: 3

.flip-container--dealer
  top: 3vh

.flip-container--player
  top: 47vh

.flip-container:hover .flipper, .flip-container.hover .flipper
  transform: rotateY(180deg)

.flipper
  transform-style: preserve-3d
  transition: all 1.5s

.front
  z-index: 2
  /* for firefox 31 */
  transform: rotateY(0deg)

.hand__card
  display: block

.opposite
  animation: opposite 2s

.opposite-enter-active
  animation: opposite 1.5s

.move-enter-active
  animation: move 3s

@keyframes move
  0%
    left: 75vw
    top: 3vh
  100%

@keyframes opposite
  0%
    transform: rotate3d(0, 1, 0, 180deg)
  70%
    transform: rotate3d(0.07, 1, 0.1, 180deg)
  100%
    transform: rotate3d(1, 1, 1, 0deg)
</style>
