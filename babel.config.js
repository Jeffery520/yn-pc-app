const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
// remove console
const plugins = ['syntax-dynamic-import', 'equire'];
if (IS_PROD) {
	plugins.push('transform-remove-console');
}

module.exports = {
	presets: ['@vue/app'],
	plugins
};
