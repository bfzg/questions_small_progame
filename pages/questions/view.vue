<template>
	<view>
		<!-- 传递 totalQuestions 和 currentQuestion 给进度条组件 -->
		<ProgressBar :totalQuestions="totalQuestions" :currentQuestion="currentQuestion" />
		<view class="px-3 py-2">
			<!-- 其他内容，例如题目和答案 -->
			<button @click="nextQuestion">下一题</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import ProgressBar from './components/progress.vue';

// 题目总数和当前题目编号
const totalQuestions = ref(10);
const currentQuestion = ref(3);

// 切换到下一题
function nextQuestion() {
	if (currentQuestion.value < totalQuestions.value) {
		currentQuestion.value += 1;
	}
}
</script>

<style></style>
