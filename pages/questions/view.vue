<template>
	<view>
		<!-- 传递 totalQuestions 和 currentQuestion 给进度条组件 -->
		<ProgressBar :totalQuestions="totalQuestions" :currentQuestion="currentQuestion" />
		<view class="px-3 py-2">
			<view v-for="(item, index) in questionItems" :key="index">
				<Topic :question="item.question" :options="item.options" @optionSelected="handleOptionSelected" />
			</view>
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
const currentQuestion = ref(3);

const pid = ref('');
const questionItems = ref([]);

onLoad((options) => {
	pid.value = options.pid || '';
	console.log('传递的题目ID:', pid.value);
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
			questionItems.value = res.items;
		});
}

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
