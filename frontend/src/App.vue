<template>
  <div class="app">

    <header class="header">
      <div class="header__inner">
        <div class="logo">
          <span class="logo__icon">✦</span>
          <h1>Bill Splitter</h1>
        </div>
        <p class="tagline">Разделите счет честно и без споров</p>
      </div>
    </header>

    <nav class="nav">
      <RouterLink to="/create" class="nav__link">
        <span class="nav__icon">＋</span>
        Добавить блюдо
      </RouterLink>
      <RouterLink to="/guest" class="nav__link">
        <span class="nav__icon">◉</span>
        Что я ел
      </RouterLink>
    </nav>

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">

body {
  background: #F7F5F0;
  color: #1A1A1A;
  font-family: 'DM Sans', sans-serif;
  min-height: 100vh;
}

.header {
  padding: 20px 0;
  position: sticky;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;

  &__icon {
    font-size: 20px;
    color: #2D5A27;
  }
}

h1 {
  font-family: 'DM Serif Display', serif;
  font-size: 32px;
  font-weight: 400;
  letter-spacing: -0.5px;
  color: #1A1A1A;
}

.tagline {
  font-size: 14px;
  color: #7A7A7A;
  font-weight: 300;
  padding-left: 25px;
}

.nav {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  position: sticky;
  flex-wrap: wrap;

  &__link {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 50px;
    border-radius: 16px;
    background: #FFFFFF;
    border: 1.5px solid #E0DDD6;
    color: #1A1A1A;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    position: sticky;

    &:hover {
      border-color: #2D5A27;
      color: #2D5A27;
      background: #E8F0E7;
    }

    &.router-link-active {
      background: #2D5A27;
      border-color: #2D5A27;
      color: #fff;
    }
  }

  &__icon {
    font-size: 16px;
  }
}

.main {
  flex: 1;
  width: 100%;
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #E0DDD6;
  padding: 20px 25px;
}
</style>