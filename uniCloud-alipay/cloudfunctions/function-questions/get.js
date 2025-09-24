const db = uniCloud.database();
const collection = db.collection('questions');

// 查询单个题目
async function getTopic(_id) {
	const res = await collection.doc(_id).get();
	if (res.data.length === 0) return {
		code: 404,
		message: '未找到该题目'
	};
	return {
		code: 0,
		data: res.data[0]
	};
}

// 查询题目列表
async function listTopics(id) {
	console.log('>>>',id);
	const response = await collection.where({
		paper_id: id
	}).get();
	console.log('>>',response);

	const total = await collection.where({
		paper_id: id
	}).count(); // 获取总条数
	return {
		items: response.data,
		total: total.total
	};
}

module.exports = {
	getTopic,
	listTopics
}