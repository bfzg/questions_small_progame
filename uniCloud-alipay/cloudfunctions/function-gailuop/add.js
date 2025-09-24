const db = uniCloud.database();
const collection = db.collection('gailuop');

// 批量导入（盖洛普测试题）
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
		if (!item.id || !item.title || !item.option) {
			throw new Error(`第 ${index + 1} 条数据缺少必要字段`);
		}

		// 校验 option 格式
		if (!item.option.a || !item.option.b) {
			throw new Error(`第 ${index + 1} 条数据缺少选项 a 或 b`);
		}

		// 校验 value 必须是数组
		if (!Array.isArray(item.option.a.value) || !Array.isArray(item.option.b.value)) {
			throw new Error(`第 ${index + 1} 条数据的选项 value 必须是数组`);
		}

		return {
			id: item.id, // 题目编号
			title: item.title, // 题目标题
			option: item.option, // 选项对象（a/b）
			version: item.version, // 版本号
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

module.exports = {
	addTopics,
}