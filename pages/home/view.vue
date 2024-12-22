<template>
	<view class="content">
		<view class="flex flex-col px-3">
			<view class="py-4">
				<HomeDescription />
			</view>

			<view v-if="loading" class="mt-4 h-full flex justify-center items-center">
				<text class="loading-text">加载中...</text>
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
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import HomeDescription from './components/home_description.vue';
import HomePaperItem from './components/home_paper.vue';
const paperItems = ref([]); // 定义列表数据
const loading = ref(true);

onMounted(() => {
	getPaperList();
});

// 获取 题目列表
const getPaperList = async (retryCount = 3) => {
	loading.value = true;
	try {
		const res = await uniCloud.callFunction({
			name: 'function-paper', // 云函数名称，与文件夹名一致
			data: {
				page: 1,
				pageSize: 2
			},
			timeout: 20000 // 设置超时时间为 10 秒
		});
		loading.value = false;
		// 检查结果并更新数据
		if (res.result) {
			const { items, total } = res.result;
			paperItems.value = items; // 更新 ref 数据
		}
	} catch (err) {
		loading.value = false;
		// 判断是否为连接超时错误并且重试次数大于0
		if (retryCount > 0 && err.message.includes('ConnectTimeoutError')) {
			console.warn(`请求超时，正在重试... 剩余重试次数: ${retryCount}`);
			// 等待3秒后重试
			await new Promise((resolve) => setTimeout(resolve, 3000));
			return getPaperList(retryCount - 1); // 递归调用，重试次数减1
		} else {
			// 如果重试次数已用尽或不是超时错误，抛出错误
			console.error('云函数调用失败:', err);
			throw err;
		}
	}
};

function handleClick(pid) {
	// 跳转到新的页面，并通过 query 参数传递 id
	uni.navigateTo({
		url: `/pages/questions/view?pid=${pid}`
	});
}
</script>

<style></style>
