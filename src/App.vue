<template>
  <div id="app">
    <div class="nav">
      <router-link to="/">{{ $t("pages.main") }}</router-link> |
      <router-link to="/about">{{ $t("pages.about") }}</router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="sass">
#app
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  background: lightgrey
  color: #2c3e50
  font-family: "Avenir", Helvetica, Arial, sans-serif
  margin: 0 auto
  padding-top: 4vh
  text-align: center
  min-height: 100vh

.nav
  height: 10vh
</style>
