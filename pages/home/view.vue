<template>
	<view class="content">
		<view class="flex flex-col px-3">
			<view class="py-4">
				<HomeDescription />
			</view>
			<view class="mt-4 rounded-tr rounded-tl h-full">
				<HomePaperItem paperId="test-key" title="韦氏智力量表" description="韦克斯勒成人智力量表，简称韦氏成人智力量表或韦氏智力测验，是一个普遍用于全世界而广受重视的评估测验" />
			</view>
		</view>
	</view>
</template>

<script setup>
import HomeDescription from './components/home_description.vue';
import HomePaperItem from './components/home_paper.vue';
</script>

<style></style>
