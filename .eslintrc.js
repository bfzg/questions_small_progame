//详细配置教程请参考：http://eslint.cn/docs/user-guide/configuring
module.exports = {
	plugins: ['html'],
	extends: 'plugin:vue/base',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
		allowImportExportEverywhere: false,
	},
	rules: {
	},
};