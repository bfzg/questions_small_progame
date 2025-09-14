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
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import HomeDescription from './components/home_description.vue';
import HomePaperItem from './components/home_paper.vue';
const paperItems = ref([]); // 定义列表数据
const loading = ref(true);

onLoad((option) => {
	getPaperList();
});

// 获取题目列表
const getPaperList = (retryCount = 3) => {
	loading.value = true;
	return uni
		.request({
			url: 'https://env-00jxu1ytdn0v.dev-hz.cloudbasefunction.cn/paper',
			method: 'GET',
			data: {
				page: 1,
				size: 10,
			},
			timeout: 5000, // 设置超时时间（毫秒）
		})
		.then((res) => {
			loading.value = false;
			// res 是一个对象，包含 statusCode、data 等
			if (res.statusCode === 200 && res.data) {
				const { items, total } = res.data;
				paperItems.value = items; // 更新 ref 数据
			} else {
				console.error('请求失败:', res);
				throw new Error('请求返回异常');
			}
		})
		.catch((err) => {
			console.log('>>>err', err);
			loading.value = false;
			// 判断是否为连接超时错误并且重试次数大于0
			if (retryCount > 0 && String(err.message || '').includes('timeout')) {
				console.warn(`请求超时，正在重试... 剩余重试次数: ${retryCount}`);
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve(getPaperList(retryCount - 1));
					}, 3000);
				});
			} else {
				// 如果重试次数已用尽或不是超时错误，抛出错误
				console.error('请求接口失败:', err);
				throw err;
			}
		});
};

// 跳转页面
function handleClick(pid) {
	// 跳转到新的页面，并通过 query 参数传递 id
	uni.navigateTo({
		url: `/pages/questions/view?pid=${pid}`,
	});
}
</script>

<style></style>
