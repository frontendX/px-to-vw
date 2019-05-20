const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('gulp-autoprefixer');
const cssnext = require('postcss-cssnext');
const pxtoviewport = require('postcss-px-to-viewport');
const shortcss = require('postcss-short');
const colorShort = require('postcss-short-color');
const postcssWriteSvg = require('postcss-write-svg');
const postcssAspectRatioMini = require('postcss-aspect-ratio-mini');
const postcssViewportUnits = require('postcss-viewport-units');

const dirs = {
	src: 'src/css',
	dist: 'dist/css'
};

const paths = {
	src: `${dirs.src}/demo.scss`,
	dist: `${dirs.dist}`
};

gulp.task('css', () => {
	let processors = [
        colorShort,
        shortcss,
        cssnext,    // 该插件可以让我们使用CSS未来的特性
        pxtoviewport({
			viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
			//viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
			unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
			viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
			selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
			minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
			mediaQuery: false // 允许在媒体查询中转换`px`著作权归作者所有。
		}),
        postcssWriteSvg, // 主要用来处理移动端1px的解决方案。该插件主要使用的是border-image和background来做1px的相关处理
        postcssAspectRatioMini, // 主要用来处理元素容器宽高比
        postcssViewportUnits, // 主要是给CSS的属性添加 content 的属性，配合 viewport-units-buggyfill 库给 vw 、 vh 、 vmin 和 vmax 做适配的操作。
    ];

	return gulp.src(paths.src)
		.pipe(sass())
        .pipe(autoprefixer())
		.pipe(postcss(processors))
		.pipe(gulp.dest(paths.dist));
});
