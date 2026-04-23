<template>
  <div>
    <p>Выберите что вы ели</p>
    <div v-for="(item,index) in dishes" :key="index">
      <div class="dishList" >
        <p>{{item.name}}</p>
        <p>{{item.price}}</p>
      </div>
    </div>
  </div>

</template>

<script setup>
</script>

<style>

</style>