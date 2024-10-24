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
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          paperId: "test-key",
          title: "韦氏智力量表",
          description: "韦克斯勒成人智力量表，简称韦氏成人智力量表或韦氏智力测验，是一个普遍用于全世界而广受重视的评估测验"
        })
      };
    };
  }
};
tt.createPage(_sfc_main);
