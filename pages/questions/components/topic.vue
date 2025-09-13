<template>
  <view class="py-2">
    <view>
      <p class="text-lg font-semibold">
        {{ record.question }}
      </p>
    </view>
    <view v-if="loading" class="mt-4 h-full flex justify-center items-center">
      <text class="loading-text">加载中...</text>
    </view>
    <view class="mt-2">
      <ul>
        <view
          v-for="item in record.options"
          :key="item.key"
          :class="['rounded-md p-2 text-lg border my-3', currentOptions === item.key ? 'bg-blue-200' : 'bg-white']"
          @click="handleOptionClick(item.key)"
        >
          {{ item.key }}、{{ item.value }}
        </view>
      </ul>
    </view>
    <div class="mt-4 w-full">
      <my-button class="w-full" type="primary" :disabled="!currentOptions" @click="nextQuestion">下一题</my-button>
    </div>
  </view>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import myButton from '@/components/ui/button.vue';
const props = defineProps({
  record: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['onClickSelected']);

const currentOptions = ref('');

function handleOptionClick(value) {
  currentOptions.value = value;
}

function nextQuestion() {
  emit('onClickSelected', currentOptions.value);
  currentOptions.value = '';
}
</script>

<style></style>
