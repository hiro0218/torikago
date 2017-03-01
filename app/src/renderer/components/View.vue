<style>
#view {
  -webkit-app-region: drag;

  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>

<template>
  <div id="view">
    <titlebar></titlebar>
    <twi ref="twi"></twi>
  </div>
</template>

<script>
  import Titlebar from './Titlebar'
  import Twi from './Twi'

  export default {
    name: 'view',
    components: {
      Titlebar,
      Twi
    },
    mounted() {
      var menu = require('./modules/menu.js');
      var twi = this.$refs.twi;
      menu.goBack = function() { twi.setMenuGoBack() };
      menu.goForward = function() { twi.setMenuGoForward() };
      menu.goPage = function(page) { twi.setMenuGoPage(page) };
      menu.ready();
    }
  }
</script>
