<template>
	<view @click="onClick" class="my-3 p-2 rounded-lg bg-white  flex justify-between items-center">
		<!-- 左侧：标题和介绍 -->
		<view class="flex-1 overflow-hidden">
			<view class="text-xl pb-1">{{ title }}</view>
			<view class="ellipsis text-xs description">{{ description }}</view>
		</view>

		<!-- 右侧：图标按钮 -->
		<view class="pl-2 text-lg">
			&gt;
		</view>
	</view>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
const emit = defineEmits(['onClick']);
const props = defineProps({
	paperId: {
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

const onClick = () => {
	emit('onClick', props.paperId);
};

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
