<template>
	<view class="py-2">
		<view>
			<p class="text-lg font-semibold">
				{{ record.question }}
			</p>
		</view>
		<view class="mt-2">
			<ul>
				<view
					v-for="(item, index) in record.options"
					:key="item.key"
					:class="['p-2 text-lg border bg-white my-3', { 'bg-blue-200': selectedIndex === item.key }]"
					@click="handleOptionClick(item.key,index)"
				>
					{{ item.key }}、{{ item.value }}
				</view>
			</ul>
		</view>
		<button class="mt-4 bg-primary text-white" @click="nextQuestion">下一题</button>
	</view>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import index from '../../../uni_modules/uview-plus';

const props = defineProps({
	record: {
		type: Object,
		required: true,
		default: () => ({})
	}
});

const emit = defineEmits(['optionSelected']);
const selectedIndex = ref(null);

function handleOptionClick(value,index) {
	selectedIndex.value = value;
	emit('optionSelected', value,index);
}
</script>

<style scoped>
.bg-blue-200 {
	background-color: #bfdbfe;
}
</style>
