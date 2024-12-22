'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {

	try {
		// 解析 POST 请求的 JSON 数据
		const body = JSON.parse(event.body || '{}');
		console.log('收到请求:', body); // 记录请求日志
		// 参数校验
		if (!body.email || !body.mobile) {
			return {
				status: 'error',
				code: 400,
				message: '缺少必要参数，请检查 email、mobile是否完整',
			};
		}

		// 准备数据
		const data = {
			content: body.content, // 反馈内容
			contact: body.contact, // 联系人名称
			email: body.email, // 联系邮箱
			mobile: body.mobile, // 联系电话
			isConact: body.isConact || false, // 是否愿意被联系，默认为 false
		};

		// 插入数据到数据库
		const res = await db.collection('feedback').add(data);

		// 返回成功响应
		return {
			status: 'success',
			code: 200,
			message: '反馈提交成功',
			data: res.id, // 返回插入记录的 ID
		};
	} catch (error) {
		console.error('请求处理失败:', error);

		// 返回失败响应
		return {
			status: 'error',
			code: 500,
			message: '服务器错误，请稍后再试',
			error: error.message, // 返回错误信息，便于调试
		};
	}
};