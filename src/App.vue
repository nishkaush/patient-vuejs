<template>
<div id="app" class="container-fluid">
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
#app {
  padding: 0;
  height: 100vh;
  background: url("./assets/my-bg.jpg") no-repeat;
}
</style>
