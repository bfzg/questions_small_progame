"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (HomeDescription + HomePaperItem)();
}
const HomeDescription = () => "./components/home_description.js";
const HomePaperItem = () => "./components/home_paper.js";
const _sfc_main = {
  __name: "view",
  setup(__props) {
    const paperItems = common_vendor.ref([]);
    common_vendor.Ys.callFunction({
      name: "function-paper",
      // 云函数名称，与文件夹名一致
      data: {
        page: 1,
        pageSize: 20
      }
    }).then((res) => {
      if (res.result) {
        const { items, total } = res.result;
        paperItems.value = items;
      }
    }).catch((err) => {
      console.error("云函数调用失败:", err);
    });
    function handleClick(pid) {
      common_vendor.index.navigateTo({
        url: `/pages/questions/view?pid=${pid}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(paperItems.value, (item, index, i0) => {
          return {
            a: "cc2a3aae-1-" + i0,
            b: common_vendor.p({
              paperId: item._id,
              title: item.title,
              description: item.description
            }),
            c: index
          };
        }),
        b: common_vendor.o(handleClick)
      };
    };
  }
};
tt.createPage(_sfc_main);
