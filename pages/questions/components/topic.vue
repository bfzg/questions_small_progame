<template>
	<view class="py-2">
		<view>
			<p class="text-lg font-semibold">
				{{ question }}
			</p>
		</view>
		<view class="mt-2">
			<ul>
				<view
					v-for="(option, key) in Object.entries(options)"
					:key="key"
					:class="['p-2 text-lg border bg-white my-3', { 'bg-blue-200': selectedOption === key }]"
					@click="handleOptionClick(key)"
				>
					{{ key }}. {{ option }}
				</view>
			</ul>
		</view>
		<button class="mt-4 bg-primary text-white" @click="nextQuestion">下一题</button>
	</view>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
	question: {
		type: String,
		required: true
	},
	options: {
		type: Object,
		required: true
	}
});

const emit = defineEmits(['optionSelected']);
const selectedIndex = ref(null);

function handleOptionClick(index) {
	selectedIndex.value = index;
	emit('optionSelected', index);
}
</script>

<style scoped>
.bg-blue-200 {
	background-color: #bfdbfe;
}
</style>
