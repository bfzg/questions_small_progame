'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		page = 1, size = 10
	} = event;
	try {
		// 获取总文档数
		const totalResult = await db.collection('paper').count();
		const total = totalResult.total;

		// 根据分页参数查询数据
		const itemsResult = await db.collection('paper')
			.skip((page - 1) * size) // 跳过前 (page-1)*size 条记录
			.limit(size) // 限制返回 size 条记录
			.get();

		const items = itemsResult.data; // 获取查询到的文档数据

		// 返回数据格式 {items:[], total:10}
		return {
			items,
			total
		};
	} catch (error) {
		console.error('查询失败：', error);
		return {
			error: error.message
		};
	}
};