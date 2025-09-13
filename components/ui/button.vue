<template>
    <button
      class="base-button"
      :class="[btnTypeClass, sizeClass]"
      :style="buttonStyle"
      :disabled="disabled || loading"
      @click="handleClick"
    >
      <!-- 加载状态 -->
      <span v-if="loading" class="loading-spinner"></span>
      <span v-else><slot /></span>
    </button>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, computed } from 'vue'
  
  const props = defineProps({
    type: { type: String, default: 'primary' }, // primary, secondary, danger
    size: { type: String, default: 'medium' },  // small, medium, large
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  })
  
  const emit = defineEmits(['click'])
  
  const handleClick = (e) => {
    if (!props.disabled && !props.loading) {
      emit('click', e)
    }
  }
  
  // 类型样式
  const btnTypeClass = computed(() => {
    switch (props.type) {
      case 'primary': return 'btn-primary'
      case 'secondary': return 'btn-secondary'
      case 'danger': return 'btn-danger'
      default: return 'btn-primary'
    }
  })
  
  // 尺寸样式
  const sizeClass = computed(() => {
    switch (props.size) {
      case 'small': return 'btn-small'
      case 'medium': return 'btn-medium'
      case 'large': return 'btn-large'
      default: return 'btn-medium'
    }
  })
  
  // 按钮最终样式（处理禁用状态，避免 scoped 样式失效）
  const buttonStyle = computed(() => {
    if (props.disabled || props.loading) {
      return {
        opacity: 0.6,
        color: '#595959',
        backgroundColor: '#dedede',
        cursor: 'not-allowed'
      }
    }
    return {}
  })
  </script>
  
  <style scoped>
  .base-button {
    display: block;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    padding: 4px 12px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  /* 类型样式 */
  .btn-primary {
    background-color: #1677ff;
    color: #fff;
  }
  .btn-secondary {
    background-color: #f5f5f5;
    color: #000;
  }
  .btn-danger {
    background-color: #ff4d4f;
    color: #fff;
  }
  
  /* 尺寸样式 */
  .btn-small {
    padding: 4px 10px;
    font-size: 12px;
  }
  .btn-medium {
    padding: 8px 16px;
    font-size: 14px;
  }
  .btn-large {
    padding: 12px 20px;
    font-size: 16px;
  }
  
  /* 加载动画 */
  .loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid #fff;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  