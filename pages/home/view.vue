<template>
	<view class="content">
		<view class="flex flex-col px-3">
			<view class="py-4">
				<HomeDescription />
			</view>
			<view class="mt-4 rounded-tr rounded-tl h-full">
				<view v-for="(item, index) in paperItems" :key="index">
					<HomePaperItem @onClick="handleClick" :paperId="item._id" :title="item.title" :description="item.description" />
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import HomeDescription from './components/home_description.vue';
import HomePaperItem from './components/home_paper.vue';
const paperItems = ref([]); // 定义列表数据

// 使用 uniCloud.callFunction 调用云函数
uniCloud
	.callFunction({
		name: 'function-paper', // 云函数名称，与文件夹名一致
		data: {
			page: 1,
			pageSize: 20,
		}
	})
	.then((res) => {
		if (res.result) {
			const { items, total } = res.result;
			paperItems.value = items; // 更新 ref 数据
		}
	})
	.catch((err) => {
		console.error('云函数调用失败:', err);
	});

function handleClick(pid) {
	// 跳转到新的页面，并通过 query 参数传递 id
	uni.navigateTo({
		url: `/pages/questions/view?pid=${pid}`
	});
}
</script>

<style></style>
