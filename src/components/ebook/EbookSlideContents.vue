<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input
          type="text"
          :placeholder="$t('book.searchHint')"
          class="slide-contents-search-input"
          @click="showSearchPage()"
        />
      </div>
      <div
        class="slide-contents-search-cancel"
        v-if="searchVisible"
        @click="hideSearchPage()"
      >
        {{ $t('book.cancel') }}
      </div>
    </div>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'

export default {
  mixins: [ebookMixin],
  data() {
    return {
      searchVisible: false
    }
  },
  methods: {
    showSearchPage() {
      this.searchVisible = true
    },
    hideSearchPage() {
      this.searchVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.ebook-slide-contents {
  width: 100%;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: 36px;
    margin: 20px 0 10px 0;
    padding: 0 15px;
    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      flex: 1;
      @include center;
      .slide-contents-search-icon {
        flex: 0 0 28px;
        font-size: 12px;
        @include center;
      }
      .slide-contents-search-input {
        flex: 1;
        width: 100%;
        height: 32px;
        font-size: 14px;
        background: transparent;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 50px;
      font-size: 14px;
      @include right;
    }
  }
}
</style>