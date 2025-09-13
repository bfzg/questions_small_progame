const db = uniCloud.database();
const collection = db.collection('questions');

// 批量导入
async function addTopics(data) {
	if (!Array.isArray(data) || data.length === 0) {
		return {
			code: 400,
			message: '参数必须是非空数组'
		};
	}

	const now = new Date();

	// 数据预处理 + 基础校验
	const docs = data.map((item, index) => {
		if (!item.paper_id || !item.question || !Array.isArray(item.options)) {
			throw new Error(`第 ${index + 1} 条数据缺少必要字段`);
		}

		if (!item.correct_answer) {
			throw new Error(`第 ${index + 1} 条数据缺少正确答案`);
		}

		// 检查 correct_answer 是否在 options 内
		const validKeys = item.options.map((opt) => opt.key);
		if (!validKeys.includes(item.correct_answer)) {
			throw new Error(`第 ${index + 1} 条数据的正确答案不在选项中`);
		}

		return {
			paper_id: item.paper_id,
			question: item.question,
			options: item.options,
			score: item.score || 0,
			correct_answer: item.correct_answer,
			created_at: now,
			updated_at: now,
		};
	});

	// 批量插入
	const res = await collection.add(docs);

	return {
		code: 0,
		message: `成功批量上传 ${docs.length} 道题目`,
		data: res.ids || [],
	};
}

// 增加题目
async function addTopic(data) {
	const now = new Date();
	const topicData = {
		...data,
		created_at: now,
		updated_at: now
	};
	const res = await collection.add(topicData);
	return {
		code: 0,
		message: '题目添加成功',
		data: res.id
	};
}

module.exports = {
	addTopics,
	addTopic
}