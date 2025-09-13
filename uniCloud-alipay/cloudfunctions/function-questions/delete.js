const db = uniCloud.database();
const collection = db.collection('questions');

/**
 * 根据 paper_id 批量删除题目
 * @param {string} paperId - 试卷 ID
 */
async function deleteByPaperId(paperId) {
	if (!paperId) {
		return {
			code: 400,
			message: '缺少参数 paperId'
		};
	}

	const res = await collection.where({
		paper_id: paperId
	}).remove();

	if (res.deleted === 0) {
		return {
			code: 404,
			message: `未找到 paper_id=${paperId} 的题目`
		};
	}

	return {
		code: 0,
		message: `成功删除 ${res.deleted} 条题目`
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

module.exports = {
	deleteByPaperId,
	deleteTopic
};