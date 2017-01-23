<style scoped>

</style>

<template>
 <twi ref="twi"></twi>
</template>

<script>
  import Twi from './Twi'

  export default {
    name: 'view',
    components: {
      Twi
    },
    mounted() {
      var menu = require('../../modules/menu.js');
      var twi = this.$refs.twi;
      menu.goBack = function() { twi.setMenuGoBack() };
      menu.goForward = function() { twi.setMenuGoForward() };
      menu.ready();
    }
  }
</script>
