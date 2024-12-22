<template>
	<view class="py-2">
		<view>
			<p class="text-lg font-semibold">
				{{ record.question }}
			</p>
		</view>
		<view v-if="loading" class="mt-4 h-full flex justify-center items-center">
			<text class="loading-text">加载中...</text>
		</view>
		<view class="mt-2">
			<ul>
				<view
					v-for="item in record.options"
					:key="item.key"
					:class="['rounded-md p-2 text-lg border bg-white my-3', { 'bg-blue-200': currentOptions === item.key }]"
					@click="handleOptionClick(item.key)"
				>
					{{ item.key }}、{{ item.value }}
				</view>
			</ul>
		</view>
		<up-button :disabled="!currentOptions" class="mt-4" type="primary" @click="nextQuestion">下一题</up-button>
	</view>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, reactive } from 'vue';
import index from '../../../uni_modules/uview-plus';
import { email } from '../../../uni_modules/uview-plus/libs/function/test';

const props = defineProps({
	record: {
		type: Object,
		required: true,
		default: () => ({})
	},
	loading: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['onClickSelected']);

const currentOptions = ref('');

function handleOptionClick(value) {
	currentOptions.value = value;
}

function nextQuestion() {
	emit('onClickSelected', currentOptions.value);
	currentOptions.value = '';
}
</script>

<style scoped>
.bg-blue-200 {
	background-color: #bfdbfe;
}
</style>
