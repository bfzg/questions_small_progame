const db = uniCloud.database();
const collection = db.collection('gailuop');

// 查询题目列表
async function listTopics(version) {
	const response = await collection.where({
		version: version
	}).get();
	const total = await collection.where({
		version: version
	}).count(); // 获取总条数
	return {
		items: response.data,
		total: total.total
	};
}

module.exports = {
	listTopics
}