const db = uniCloud.database();
const collection = db.collection('gailuop');

/**
 * 删除gailuop集合中的所有文档
 */
async function deleteAll() {
  // 不添加where条件，直接删除集合中的所有文档
  const res = await collection.remove();

  if (res.deleted === 0) {
    return {
      code: 404,
      message: '集合中没有可删除的文档'
    };
  }

  return {
    code: 0,
    message: `成功删除 ${res.deleted} 条文档`
  };
}

module.exports = {
  deleteAll
};
