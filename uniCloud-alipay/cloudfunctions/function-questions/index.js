'use strict';

const db = uniCloud.database();
const collection = db.collection('questions'); // 题目表集合名称为 topics

exports.main = async (event, context) => {
	const {
		action,
		data,
		_id
	} = event;
	try {
		switch (action) {
			case 'add': // 新增题目
				return await addTopic(data);
			case 'delete': // 删除题目
				return await deleteTopic(_id);
			case 'update': // 更新题目
				return await updateTopic(_id, data);
			case 'get': // 查询单个题目
				return await getTopic(_id);
			case 'list': // 查询题目列表
				return await listTopics(data);
			default:
				return {
					code: 400, message: '未识别的操作类型'
				};
		}
	} catch (error) {
		return {
			code: 500,
			message: error.message
		};
	}
};

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

// 删除题目
async function deleteTopic(_id) {
	const res = await collection.doc(_id).remove();
	if (res.deleted === 0) return {
		code: 404,
		message: '未找到该题目'
	};
	return {
		code: 0,
		message: '题目删除成功'
	};
}

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
async function listTopics(data) {
	const {
		page = 1, pageSize = 10, pid
	} = data;
	// 使用分页查询
	console.log('>>>', pid, data);
	const response = await collection.where({
			paper_id: pid
		})
		.skip((page - 1) * pageSize)
		.limit(pageSize).get();

	const total = await collection.where({
		paper_id: pid
	}).count(); // 获取总条数
	console.log(response, total);
	return {
		items: response.data,
		total: total.total
	};
}