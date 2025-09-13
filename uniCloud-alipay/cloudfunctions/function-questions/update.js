const db = uniCloud.database();
const collection = db.collection('questions');

// 更新题目
async function updateTopic(_id, data) {
	const now = new Date();
	const res = await collection.doc(_id).update({
		...data,
		updated_at: now
	});
	if (res.updated === 0) return {
		code: 404,
		message: '未找到该题目'
	};
	return {
		code: 0,
		message: '题目更新成功'
	};
}

module.exports = {
    updateTopic
}