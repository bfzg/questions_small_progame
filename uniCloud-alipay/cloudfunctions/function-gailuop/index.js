'use strict';
const {
	addTopics
} = require('./add.js');
const {
	listTopics
} = require('./get.js');
const {
	deleteAll
} = require('./delete.js')


exports.main = async (event, context) => {
	// 解析 HTTP 请求 body（POST 请求）或 query（GET 请求）
	let body = {};
	try {
		if (typeof event.body === 'string') {
			body = JSON.parse(event.body || '{}');
		} else {
			body = event.body || {};
		}
	} catch (e) {
		console.error('body parse error:', e);
		body = {};
	}

	const query = event.queryStringParameters || {};

	// 支持从 body 或 query 获取参数
	const version = body.version || query.version;
	const action = body.action || query.action;
	const data = body.data || query.data;
	try {
		switch (action) {
			case 'addTopics':
				return await addTopics(data);
			case 'list':
				return await listTopics(version);
			case 'deleteAll':
				return await deleteAll();
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