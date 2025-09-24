'use strict';
const db = uniCloud.database();
const collection = db.collection('paper');
exports.main = async (event, context) => {
	try {
		// 获取总数
		const totalResult = await collection.count();
		const total = totalResult.total;

		// 分页查数据
		const itemsResult = await collection.get();

		return {
			items: itemsResult.data || [],
			total
		};
	} catch (error) {
		return {
			items: [],
			total: 0,
			error: error.message
		};
	}
};