<script>
import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';

export default {
	onLaunch: async function () {
		console.log('App Launch');
		// #ifdef MP-WEIXIN
		uniCloud.initSecureNetworkByWeixin();
		// #endif
		await uniIdPageInit()
	},
	mounted() {
		// #ifdef H5
		//const VConsole = require('@/common/js/vconsole.min.js')
		//new VConsole()
		// #endif
	},
	onShow: function () {
		console.log('App Show');
	},
	onHide: function () {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import '@/uni_modules/uview-plus/index.scss';

/*每个页面公共css */
/* #ifndef APP-NVUE */
view {
	box-sizing: border-box;
}

@font-face {
	font-family: 'iconfont';
	src: url('https://at.alicdn.com/t/font_2354462_s00xh8caffp.ttf');
}

.ico {
	font-family: iconfont;
}

/* #endif */
</style>
