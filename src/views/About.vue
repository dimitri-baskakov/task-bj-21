<template>
  <div
    class="about"
  >
    <div
      class="description-header"
    >
      <h1>{{ $t("description") }}</h1>
    </div>

    <div
      class="description-image"
    >
      <img
        alt="blackjack description"
        src="@/assets/images/design.png"
      />
    </div>

    <div>
      <p>
        Сделать игру blackjack (21) в классическом варианте. Карты из колоды должны появляться с анимацией (без использования сторонних библиотек). Следовать представленному дизайну не обязательно, реализовывать всю графику карт также необязательно (можно обозначать картинки карт текстом, например “валет червей”). Приложение должно работать на vue (vuex по желанию).
      </p>
    </div>
  </div>
</template>

<style lang="sass">
.about
  display: grid
  grid-auto-rows: minmax(100px, auto)
  grid-template-columns: repeat(2, 1fr)
  text-align: justify

.description-header
  grid-column: 1/3

.description-image img
  width: 100%
</style>

<i18n>
{
  "ru": {
    "description": "Описание"
  }
}
</i18n>
