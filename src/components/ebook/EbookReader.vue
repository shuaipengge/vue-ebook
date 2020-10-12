<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>
<script>
import { ebookMixin } from '@/utils/mixin'
import Epub from 'epubjs'
global.ePub = Epub

export default {
  mixins: [ebookMixin],
  mounted() {
    this.setFileName(this.$route.params.fileName.split('|').join('/')).then(
      () => {
        this.initEpub()
      }
    )
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
      // epub.js 基于iframe实现 需要向iframe绑定 触摸开始 触摸结束 事件
      this.rendition.on('touchstart', event => {
        // 第一个手机触摸的x坐标
        this.touchStartX = event.changedTouches[0].clientX
        // 触摸的开始时间
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        // X轴偏移量
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        // 触摸时间
        const time = event.timeStamp - this.touchStartTime

        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        // 禁用默认事件
        event.preventDefault()
        // 禁用事件传播
        event.stopPropagation()
      })
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev()
        this.hideTitleAndMenu()
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next()
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu() {
      // this.$store.dispatch('setMenuVisible', !this.menuVisible)
      this.setMenuVisible(!this.menuVisible)
    },
    hideTitleAndMenu() {
      // this.$store.dispatch('setMenuVisible', false)
      this.setMenuVisible(false)
    }
  }
}
</script>

<style lang="scss" scoped></style>
