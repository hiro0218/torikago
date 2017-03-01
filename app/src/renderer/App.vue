<style>
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html,
  body {
    -webkit-app-region: drag;

    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: #fff;
  }

  body {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
    border: 1px solid #ddd;

  }

  .overlay {
    position: fixed;
    height: 100%;
    width: 100%;
    pointer-events: none;
  }
  .grayscale .overlay {
    backdrop-filter: grayscale(100%);
  }

</style>

<template>
 <router-view></router-view>
</template>

<script>
  import store from 'renderer/vuex/store'

  export default {
    store
  }
</script>
