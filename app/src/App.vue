<style>
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
   height: 100%;
   width: 100%;
  }

  body {
   display: flex;
   flex-direction: column;
   flex-wrap: nowrap;
   justify-content: flex-start;
   align-items: stretch;
   align-content: stretch;
  }
</style>

<template>
 <router-view></router-view>
</template>

<script>
  import store from 'src/vuex/store'

  export default {
    store
  }
</script>
