<template>
  <h1>Bill Splitter</h1>
  <p>Разделите счет честно и без споров</p>

  <nav>
    <RouterLink to="/create">Добавить блюдо: </RouterLink>
    <RouterLink to="/guest">Что я ел: </RouterLink>
  </nav>

  <main>
    <RouterView/>
  </main>
</template>

<script setup>
</script>

<style>

</style>