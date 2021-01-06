<template>
  <div>
    <h2>
      {{ $t(`hands.${role}.scoreLabel`) }} :
      <transition name="fade">
        <span v-if="!hasNewCards(role)">
          {{ score(role) }}
        </span>
      </transition>
    </h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'hasNewCards',
      'score',
    ]),
  },
  name: "Score",
  props: {
    role: String,
  },
};
</script>

<style lang="sass">
.fade-enter-active
  transition: all 5s 2s

.fade-leave-active
  transition: all 1s

.fade-enter, .fade-leave-to
  transform: translateX(100px)
  opacity: 0
</style>
