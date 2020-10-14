<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 0">
      <div class="setting-font-size">
        <div
          class="preview"
          :style="{ fontSize: fontSizeList[0].fontSize + 'px' }"
        >
          A
        </div>
        <div class="select">
          <div
            class="select-wrapper"
            v-for="(item, index) in fontSizeList"
            :key="index"
            @click="setFontSize(item.fontSize)"
          >
            <div class="line"></div>
            <div class="point-wrapper">
              <div class="point" v-show="defaultFontSize === item.fontSize">
                <div class="small-point"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div
          class="preview"
          :style="{
            fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'
          }"
        >
          A
        </div>
      </div>
      <div class="setting-font-family" @click="showFontFamilyPopup">
        <div class="setting-font-family-text-wrapper">
          <div class="setting-font-family-text">
            {{ defaultFontFamily }}
          </div>
        </div>
        <div class="setting-font-family-icon-wrapper">
          <div class="icon-forward"></div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { FONT_SIZE_LIST } from '@/utils/book'
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      fontSizeList: FONT_SIZE_LIST
    }
  },
  methods: {
    setFontSize(fontSize) {
      this.setDefaultFontSize(fontSize)
      this.currentBook.rendition.themes.fontSize(fontSize)
    },
    showFontFamilyPopup() {
      this.setFontFamilyVisible(true)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/global';

.setting-wrapper {
  position: absolute;
  bottom: 48px;
  left: 0;
  z-index: 101;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90px;
  background: white;
  box-shadow: 0 -8px 8px rgba(0, 0, 0, 0.15);
  .setting-font-size {
    flex: 2;
    display: flex;
    height: 100%;
    .preview {
      flex: 0 0 40px;
      @include center;
    }
    .select {
      display: flex;
      flex: 1;
      .select-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        &:first-child {
          .line {
            &:first-child {
              border-top: none;
            }
          }
        }
        &:last-child {
          .line {
            &:last-child {
              border-top: none;
            }
          }
        }
        .line {
          flex: 1;
          height: 0;
          border-top: 1px solid #ccc;
        }
        .point-wrapper {
          position: relative;
          flex: 0 0 0;
          width: 0;
          height: 7px;
          border-left: 1px solid #ccc;
          .point {
            position: absolute;
            top: -8px;
            left: -10px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: white;
            border: 1px solid #ccc;
            box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
            @include center;
            .small-point {
              width: 5px;
              height: 5px;
              background: black;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .setting-font-family {
    flex: 1;
    font-size: 14px;
    @include center;
    .setting-font-family-text-wrapper {
      @include center;
    }
    .setting-font-family-icon-wrapper {
      @include center;
    }
  }
}
</style>
