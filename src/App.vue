<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['test'])
  },
  mounted() {
    this.$store.dispatch('setTest', 9).then(() => {
      console.log(this.test)
    })
  }
}
</script>

<style></style>
