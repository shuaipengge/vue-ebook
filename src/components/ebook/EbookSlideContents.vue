<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input
          type="text"
          v-model="searchText"
          :placeholder="$t('book.searchHint')"
          class="slide-contents-search-input"
          @click="showSearchPage()"
          @keyup.enter.exact="search()"
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
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img" />
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title" v-if="metadata">
          {{ metadata.title }}
        </div>
        <div class="slide-contents-book-author" v-if="metadata">
          {{ metadata.creator }}
        </div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{ progress + '%' }}</span>
          <span class="progress-text">{{ $t('book.haveRead2') }}</span>
        </div>
        <div class="slide-contents-book-time">{{ getReadTimeText() }}</div>
      </div>
    </div>
    <scroll
      class="slide-contents-list"
      :top="156"
      :bottom="48"
      v-show="!searchVisible"
    >
      <div
        class="slide-contents-item"
        v-for="(item, index) in navigation"
        :key="index"
      >
        <span
          class="slide-contents-item-label"
          :class="{ selected: section === index }"
          :style="contentItemStyle(item)"
          @click="displayNavigation(item.href, false)"
          >{{ item.label }}</span
        >
        <span class="slide-contents-item-page"></span>
      </div>
    </scroll>
    <scroll
      class="slide-search-list"
      :top="66"
      :bottom="48"
      v-show="searchVisible"
    >
      <div
        class="slide-search-item"
        v-for="(item, index) in searchList"
        :key="index"
        @click="displayNavigation(item.cfi, true)"
        v-html="item.excerpt"
      ></div>
    </scroll>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import Scroll from '@/components/common/Scroll'
import { px2rem } from '../../utils/utils'

export default {
  mixins: [ebookMixin],
  components: { Scroll },
  data() {
    return {
      searchVisible: false,
      searchList: null,
      searchText: ''
    }
  },
  methods: {
    search() {
      if (this.searchText && this.searchText.length > 0) {
        this.doSearch(this.searchText).then(list => {
          this.searchList = list
          this.searchList.map(item => {
            item.excerpt = item.excerpt.replace(
              this.searchText,
              `<span class="content-search-text">${this.searchText}</span>`
            )
            return item
          })
        })
      }
    },
    doSearch(q) {
      return Promise.all(
        this.currentBook.spine.spineItems.map(section =>
          section
            .load(this.currentBook.load.bind(this.currentBook))
            .then(section.find.bind(section, q))
            .finally(section.unload.bind(section))
        )
      ).then(results => Promise.resolve([].concat.apply([], results)))
    },
    showSearchPage() {
      this.searchVisible = true
    },
    hideSearchPage() {
      this.searchVisible = false
      this.searchText = ''
      this.searchList = null
    },
    contentItemStyle(item) {
      return {
        marginLeft: `${px2rem(item.level * 15)}rem`
      }
    },
    displayNavigation(target, highlight = false) {
      this.display(target, () => {
        this.hideTitleAndMenu()
        if (highlight) {
          this.currentBook.rendition.annotations.highlight(target)
        }
      })
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
  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: 90px;
    padding: 10px 15px 20px 15px;
    box-sizing: border-box;
    .slide-contents-book-img-wrapper {
      flex: 0 0 45px;
      .slide-contents-book-img {
        width: 45px;
        height: 60px;
      }
    }
    .slide-contents-book-info-wrapper {
      flex: 1;
      padding: 0 10px;
      box-sizing: border-box;
      .slide-contents-book-title {
        width: 153.75px;
        font-size: 14px;
        line-height: 16px;
        @include ellipsis2(2);
      }
      .slide-contents-book-author {
        width: 153.75px;
        font-size: 12px;
        margin-top: 5px;
        @include ellipsis;
      }
    }
    .slide-contents-book-progress-wrapper {
      flex: 0 0 70px;
      display: flex;
      flex-direction: column;
      .slide-contents-book-progress {
        .progress {
          font-size: 14px;
        }
        .progress-text {
          font-size: 12px;
        }
      }
      .slide-contents-book-time {
        font-size: 12px;
        margin-top: 5px;
      }
    }
  }
  .slide-contents-list {
    padding: 0 15px;
    box-sizing: border-box;
    .slide-contents-item {
      display: flex;
      padding: 20px 0;
      box-sizing: border-box;
      .slide-contents-item-label {
        flex: 1;
        font-size: 14px;
        line-height: 16px;
        @include ellipsis;
      }
      .slide-contents-item-page {
      }
    }
  }
  .slide-search-list {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    .slide-search-item {
      font-size: 14px;
      line-height: 16px;
      padding: 20px 0;
      box-sizing: border-box;
    }
  }
}
</style>
