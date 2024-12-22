<template>
	<view>
		<view class="py-2 pl-2">
			<view class="pb-1 text-3xl">{{ greeting }}</view>
			<view class="text-sm">{{ message }}</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const greeting = ref('');
const message = ref('人生处处是考试，何必在意这场');

// 初始化时更新问候语
onMounted(() => {
	updateGreeting();
});
// 根据时间获取问候语
const updateGreeting = () => {
	const hour = new Date().getHours();
	if (hour < 5) {
		greeting.value = '早点睡';
		message.value = '早点睡，与其焦虑不如与自己和解';
	} else if (hour < 12) {
		greeting.value = '早上好';
	} else if (hour < 18) {
		greeting.value = '中午好';
	} else {
		greeting.value = '晚上好';
	}
};
</script>
