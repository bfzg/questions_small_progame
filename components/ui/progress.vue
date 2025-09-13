<template>
  <view class="line-progress" :style="{ height }">
    <!-- 背景条 -->
    <view class="line-progress__bg"></view>

    <!-- 进度条 -->
    <view
      class="line-progress__bar"
      :style="{
        width: percentage + '%',
        backgroundColor: color,
      }"
    >
      <!-- 是否显示文字 -->
      <text v-if="showText" class="line-progress__text">{{ percentage }}%</text>
    </view>
  </view>
</template>

<script setup>
defineProps({
  percentage: {
    type: Number,
    default: 0,
  },
  showText: {
    type: Boolean,
    default: true,
  },
  height: {
    type: String,
    default: '8px',
  },
  color: {
    type: String,
    default: '#4CAF50',
  },
});
</script>

<style scoped>
.line-progress {
  position: relative;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  height: 8px;
}
.line-progress__bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f0f0f0;
}
.line-progress__bar {
  position: relative;
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.line-progress__text {
  font-size: 12px;
  color: #fff;
}
</style>
