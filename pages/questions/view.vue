<template>
	<view>
		<!-- 传递 totalQuestions 和 currentQuestion 给进度条组件 -->
		<ProgressBar :totalQuestions="totalQuestions" :currentQuestion="currentQuestion + 1" />
		<view class="px-3 py-2">
			<Topic :loading="isLoading" :record="questionItems[currentQuestion]" @onClickSelected="onClickSelected" />
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
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

const isLoading = ref(false);

// 在页面加载时获取题目列表
onLoad((options) => {
	pid.value = options.pid || '';
	getDataList();
});

function getDataList(retryCount = 3) {
	isLoading.value = true;
	return uniCloud
		.callFunction({
			name: 'function-questions',
			data: {
				action: 'list',
				data: {
					page: 1,
					pageSize: 100,
					pid: pid.value
				}
			},
			timeout: 20000 // 设置超时时间为 10 秒
		})
		.then((res) => {
			const { items, total } = res.result;
			totalQuestions.value = total;
			questionItems.value = items;
			isLoading.value = false;
		})
		.catch((error) => {
			isLoading.value = falsefs;
			// 检查是否为连接超时错误
			if (retryCount > 0 && error.message.includes('ConnectTimeoutError')) {
				console.warn(`请求超时，正在重试... 剩余重试次数: ${retryCount}`);
				// 延迟 3 秒后重试
				return new Promise((resolve) => setTimeout(resolve, 3000)).then(() => getDataList(retryCount - 1));
			} else {
				// 如果不是超时错误或重试次数已用尽，则抛出错误
				console.error('请求失败:', error);
				throw error;
			}
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
	if (value === questionItems.value[currentQuestion.value].correct_answer) {
		const score = questionItems.value[currentQuestion.value].score;
		totalScore.value += score;
	}
	if (currentQuestion.value < totalQuestions.value - 1) {
		currentQuestion.value++;
	} else {
		jumpToScore();
		totalScore.value += questionItems.value[currentQuestion.value].score;
	}
}

function jumpToScore() {
	// &userSelectQuestion=${JSON.stringify(userSelectQuestion.value)}
	uni.redirectTo({
		url: `/pages/score/view?totalScore=${String(totalScore.value)}`
	});
}
</script>

<style></style>
