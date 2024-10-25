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
					v-for="(option, index) in options"
					:key="index"
					:class="['p-2 text-lg border bg-white my-3', { 'bg-blue-200': selectedIndex === index }]"
					@click="handleOptionClick(index)"
				>
					{{ option }}
				</view>
			</ul>
		</view>
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
		type: Array,
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
