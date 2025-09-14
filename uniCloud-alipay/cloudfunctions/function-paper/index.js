'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	console.log('>>event', event);
	const page = Number(event.page) || 1;
	const size = Number(event.size) || 10;

	try {
		// 获取总数
		const totalResult = await db.collection('paper').count();
		const total = totalResult.total;

		// 分页查数据
		const itemsResult = await db.collection('paper')
			.skip((page - 1) * size)
			.limit(size)
			.get();

		return {
			items: itemsResult.data || [],
			total
		};
	} catch (error) {
		console.error('查询失败：', error);
		return {
			items: [],
			total: 0,
			error: error.message
		};
	}
};