<template>
	<view class="quiz-progress">
		<!-- 显示进度条 -->
		<up-line-progress :percentage="progress" height="8px" active color="#4CAF50"></up-line-progress>

		<!-- 显示题目编号 -->
		<view class="progress-text">题目 {{ currentQuestion }} / {{ totalQuestions }}</view>
	</view>
</template>

<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
	totalQuestions: {
		type: Number,
		required: true
	},
	currentQuestion: {
		type: Number,
		required: true
	}
});

// 解构 props
const { totalQuestions, currentQuestion } = toRefs(props);

// 计算进度百分比
const progress = computed(() => {
	return (currentQuestion.value / totalQuestions.value) * 100;
});
</script>

<style scoped>
.quiz-progress {
	padding: 16px;
}

.progress-text {
	text-align: center;
	margin-top: 8px;
	font-size: 14px;
	color: #333;
}
</style>
