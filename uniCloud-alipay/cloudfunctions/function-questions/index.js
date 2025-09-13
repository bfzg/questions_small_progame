'use strict';
const {
	addTopic,
	addTopics
} = require('./add.js')
const {
	deleteByPaperId,
	deleteTopic
} = require('./delete.js')
const {
	updateTopic
} = require('./update.js')
const {
	getTopic,
	listTopics
} = require('./get.js')

exports.main = async (event, context) => {
	const {
		action,
		data,
		id,
		paperId
	} = event;
	try {
		switch (action) {
			case 'add': // 新增题目
				return await addTopic(data);
			case 'addTopics': // 新增题目 通过 数组
				return await addTopics(data);
			case 'delete': // 删除题目
				return await deleteTopic(id);
			case 'deletePaper':
				return await deleteByPaperId(paperId);
			case 'update': // 更新题目
				return await updateTopic(id, data);
			case 'get': // 查询单个题目
				return await getTopic(id);
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