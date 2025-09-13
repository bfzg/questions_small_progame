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
async function listTopics(data) {
    const {
        page = 1, pageSize = 10, pid
    } = data;
    // 使用分页查询
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

module.exports = {
    getTopic,
    listTopics
}