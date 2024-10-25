<template>
	<view>
		<!-- 传递 totalQuestions 和 currentQuestion 给进度条组件 -->
		<ProgressBar :totalQuestions="totalQuestions" :currentQuestion="currentQuestion" />
		<view class="px-3 py-2">
			<Topic :question="questionData" :options="optionsData" @optionSelected="handleOptionSelected" />
			<!-- 其他内容，例如题目和答案 -->
			<button class="mt-4 bg-primary text-white" @click="nextQuestion">下一题</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import ProgressBar from './components/progress.vue';
import Topic from './components/topic.vue';

const questionData = '1. 以下哪一个是 Vue 的生命周期钩子？';
const optionsData = ['A. created()', 'B. mounted()', 'C. updated()', 'D. destroyed()'];

// 题目总数和当前题目编号
const totalQuestions = ref(10);
const currentQuestion = ref(3);

// 点击选项时的回调函数
function handleOptionSelected(index) {
	console.log(`你选择了选项: ${optionsData[index]}`);
}

// 切换到下一题
function nextQuestion() {
	if (currentQuestion.value < totalQuestions.value) {
		currentQuestion.value += 1;
	}
}
</script>

<style></style>
