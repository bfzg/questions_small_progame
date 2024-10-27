<template>
	<view>
		<!-- 传递 totalQuestions 和 currentQuestion 给进度条组件 -->
		<ProgressBar :totalQuestions="totalQuestions" :currentQuestion="currentQuestion" />
		<view class="px-3 py-2">
			<Topic :record="questionItems[currentQuestion]" @onClickSelected="onClickSelected" />
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import ProgressBar from './components/progress.vue';
import Topic from './components/topic.vue';

// 题目总数和当前题目编号
const totalQuestions = ref(10);
const currentQuestion = ref(0);

const pid = ref('');
const questionItems = ref([]);
const userSelectQuestion = ref([]);
const totalScore = ref(0);

// 在页面加载时获取题目列表

onLoad((options) => {
	pid.value = options.pid || '';
	getDataList();
});

function getDataList() {
	uniCloud
		.callFunction({
			name: 'function-questions',
			data: {
				action: 'list',
				data: {
					page: 1,
					pageSize: 10,
					pid: pid.value
				}
			}
		})
		.then((res) => {
			const { items, total } = res.result;
			totalQuestions.value = total;
			questionItems.value = items;
		});
}

// 点击选项时的回调函数
function onClickSelected(value) {
	userSelectQuestion.value.push({
		id: questionItems.value[currentQuestion.value]._id,
		index: currentQuestion.value,
		answer: value,
		correct_answer: questionItems.value[currentQuestion.value].correct_answer
	});
	console.log(value, currentQuestion.value);
	if (value === questionItems.value[currentQuestion.value].correct_answer) {
		console.log('答对了');
		totalScore.value += 10;
	}
	if (currentQuestion.value < totalQuestions.value - 1) {
		currentQuestion.value += 1;
	} else {
		jumpToScore();
	}
}

function jumpToScore() {
	// &userSelectQuestion=${JSON.stringify(userSelectQuestion.value)}
	uni.navigateTo({
		url: `/pages/score/view?totalScore=${String(totalScore.value)}`
	});
}
</script>

<style></style>
