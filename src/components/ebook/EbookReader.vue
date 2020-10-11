<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Epub from 'epubjs'
global.ePub = Epub

export default {
  computed: {
    ...mapGetters(['fileName'])
  },
  mounted() {
    this.$store
      .dispatch('setFileName', this.$route.params.fileName.split('|').join('/'))
      .then(() => {
        this.initEpub()
      })
  },
  methods: {
    initEpub() {
      console.log(this.fileName)
      const url = 'http://127.0.0.1:8888/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      this.rendition.display()
      console.log(this.book)
    }
  }
}
</script>

<style lang="scss" scoped></style>
