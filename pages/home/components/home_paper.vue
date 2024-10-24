<template>
	<view class="p-2 rounded-lg bg-white border flex justify-between items-center" @click="handleClick">
		<!-- 左侧：标题和介绍 -->
		<view class="flex-1 overflow-hidden">
			<view class="text-xl pb-1">{{ title }}</view>
			<view class="ellipsis text-xs description">{{ description }}</view>
		</view>

		<!-- 右侧：图标按钮 -->
		<view class="pl-2">
			<up-icon name="arrow-right"></up-icon>
		</view>
	</view>
</template>

<script setup>

const props = defineProps({
	paperid: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

function handleClick() {
	// 跳转到新的页面，并通过 query 参数传递 id
	uni.navigateTo({
		url: '/pages/questions/view?id=1'
	});
}
</script>

<style scoped>
.ellipsis {
	white-space: nowrap; /* 禁止换行 */
	overflow: hidden; /* 超出部分隐藏 */
	text-overflow: ellipsis; /* 超出部分显示省略号 */
}
.description {
	color: #bdbdbd;
}
</style>
