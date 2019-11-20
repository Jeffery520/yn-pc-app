const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
// remove console
const plugins = [
	[
		'component',
		{
			libraryName: 'element-ui',
			styleLibraryName: 'theme-chalk'
		},
		'syntax-dynamic-import'
	]
];
if (IS_PROD) {
	plugins.push('transform-remove-console');
}

module.exports = {
	presets: ['@vue/app'],
	plugins
};
