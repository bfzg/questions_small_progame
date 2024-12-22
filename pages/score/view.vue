<template>
	<div>
		<view class="text-center py-2 flex justify-center">
			<h1 class="text-xl">你的分数: {{ totalScore }}</h1>
		</view>
		<view class="container">
			<text class="title">韦氏智力量表智力等级对照表</text>
			<view class="table mt-4 p-2">
				<view class="table-row header">
					<text class="table-cell">分数范围</text>
					<text class="table-cell">智力水平</text>
				</view>
				<view class="table-row" v-for="(item, index) in intelligenceScale" :key="index">
					<text class="table-cell">{{ item.min }} - {{ item.max }}</text>
					<text class="table-cell">{{ item.level }}</text>
				</view>
			</view>
		</view>

		<view class="mt-4">
			<button class="w-1-2 mt-4 bg-primary text-white" @click="jumpToHome">回到首页</button>
		</view>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const intelligenceScale = [
	{ min: 90, max: 100, level: '非常优秀' },
	{ min: 80, max: 90, level: '优秀' },
	{ min: 70, max: 80, level: '中上' },
	{ min: 60, max: 70, level: '普通' },
	{ min: 50, max: 60, level: '中下' },
	{ min: 40, max: 50, level: '边缘水平' },
	{ min: 0, max: 40, level: '显著低下' }
];

const totalScore = ref('');
// const userSelectQuestion = ref([]);

onLoad((options) => {
	totalScore.value = options.totalScore;
	// userSelectQuestion.value = Number(options.userSelectQuestion);
});

function jumpToHome() {
	uni.reLaunch({
		url: '/pages/home/view'
	});
}
</script>

<style scoped>
.container {
	padding: 16px;
	text-align: center;
}
.title {
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 16px;
}
.table {
	width: 100%;
	border-collapse: collapse;
}
.table-row {
	display: flex;
	flex-direction: row;
	border-bottom: 1px solid #ddd;
}
.header {
	background-color: #f7f7f7;
	font-weight: bold;
}
.table-cell {
	flex: 1;
	padding: 8px;
	border-right: 1px solid #ddd;
	text-align: center;
}
.table-cell:last-child {
	border-right: none;
}
</style>
