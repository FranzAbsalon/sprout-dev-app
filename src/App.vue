<script setup>
  import Header from './components/Header.vue';
  import Sidebar from './components/Sidebar.vue';
  import Main from './components/Main.vue';
</script>

<template>
  <Header />
  <div class="flex">
    <Sidebar />
    <Main />
  </div>
</template>

<style scoped>

</style>
