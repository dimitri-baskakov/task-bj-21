<template>
  <div class="about">
    <h1>{{ $t("description") }}</h1>

    <img class="description-image" src="@/assets/images/design.png" alt="" />

    <p>
      Сделать игру blackjack (21) в классическом варианте. Карты из колоды должны появляться с анимацией (без использования сторонних библиотек). Следовать представленному дизайну не обязательно, реализовывать всю графику карт также необязательно (можно обозначать картинки карт текстом, например “валет червей”). Приложение должно работать на vue (vuex по желанию).
    </p>
  </div>
</template>

<style lang="sass">
.about
  text-align: justify

.description-image
  width: 50%
</style>

<i18n>
{
  "ru": {
    "description": "Описание"
  }
}
</i18n>
