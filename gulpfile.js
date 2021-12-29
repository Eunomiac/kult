/* eslint-disable sort-keys */
// #region ▮▮▮▮▮▮▮ IMPORTS ▮▮▮▮▮▮▮ ~
const {src, dest, watch, series, parallel} = require("gulp");
const plumber = require("lazypipe");
const plunger = require("gulp-plumber");
const logger = require("fancy-log");
const debug = require("gulp-debug");

const cleaner = require("del");
const renamer = require("gulp-rename");
const header = require("gulp-header");
const replacer = require("gulp-replace");

const terser = require("gulp-terser");

const sasser = require("gulp-sass")(require("node-sass"));
const bundler = require("gulp-postcss");
const prefixer = require("autoprefixer");
const minifier = require("cssnano");

const packageJSON = require("./package");
// #endregion ▮▮▮▮[IMPORTS]▮▮▮▮
// #region ▮▮▮▮▮▮▮[UTILITY] Data References & Utility Functions for File Parsing ▮▮▮▮▮▮▮ ~
const ANSICOLORS = {
	// RESET
	x: "\u001b[0m",

	// Standard Colors
	black: "\u001b[30m",
	grey: "\u001b[30;1m",
	red: "\u001b[31m",
	green: "\u001b[32m",
	yellow: "\u001b[33m",
	blue: "\u001b[34m",
	magenta: "\u001b[35m",
	cyan: "\u001b[36m",
	white: "\u001b[37m",

	// Bright Colors
	bred: "\u001b[31;1m",
	bgreen: "\u001b[32;1m",
	byellow: "\u001b[33;1m",
	bblue: "\u001b[34;1m",
	bmagenta: "\u001b[35;1m",
	bcyan: "\u001b[36;1m",
	bwhite: "\u001b[37;1m",

	// Standard Background Colors
	bgblack: "\u001b[40m",
	bggrey: "\u001b[40;1m",
	bgred: "\u001b[41m",
	bggreen: "\u001b[42m",
	bgyellow: "\u001b[43m",
	bgblue: "\u001b[44m",
	bgmagenta: "\u001b[45m",
	bgcyan: "\u001b[46m",
	bgwhite: "\u001b[47m",

	// Bright Background Colors
	bgbred: "\u001b[41;1m",
	bgbgreen: "\u001b[42;1m",
	bgbyellow: "\u001b[43;1m",
	bgbblue: "\u001b[44;1m",
	bgbmagenta: "\u001b[45;1m",
	bgbcyan: "\u001b[46;1m",
	bgbwhite: "\u001b[47;1m",

	// Styles
	none: "",
	bold: "\u001b[1m",
	underline: "\u001b[4m",
	invert: "\u001b[7m"
};
const STREAMSTYLES = {
	gulp: ["grey", "█", "(gulp)"],
	jsFull: ["bmagenta", "█", " JS "],
	jsMin: ["magenta", "░", " js "],
	cssFull: ["byellow", "█", " SCSS "],
	cssMin: ["yellow", "░", " scss "],
	hbs: ["bblue", "█", " HBS "],
	toDest: ["bgreen", "█", " ASSETS "]
};
const ansi = (str, {fg, bg, style} = {}) => {
	fg = ANSICOLORS[fg ?? "white"];
	bg = ANSICOLORS[`bg${bg ?? "black"}`.replace(/^bg+/, "bg")];
	style = ANSICOLORS[style ?? "none"];
	return [bg, fg, style, str, ANSICOLORS.x].join("");
};
const toBright = (color) => (`b${color}` in ANSICOLORS ? `b${color}` : color);
const toDim = (color) => (color.slice(1) in ANSICOLORS ? color.slice(1) : color);
const toBg = (color) => `bg${color}`.replace(/^(bg)+/, "");
const logParts = {
	tag: (tag = "gulp", color = "white", padChar = "█") => ansi(`▌${centerString(tag, 10, padChar)}▐`, {fg: color}),
	error: (tag, message) => [ansi(`[ERROR: ${tag}]`, {fg: "white", bg: "red", style: "bold"}), ansi(message, {fg: "red"})].join(" "),
	finish: function alertFinish(title = "gulp", source, destination) {
		const [color, padChar, tag] = STREAMSTYLES[title];
		return [
			this.tag(tag, color, padChar),
			" ",
			ansi(source, {fg: toBright(color), style: "underline"}),
			ansi(" successfully piped to ", {fg: toDim(color), style: "none"}),
			ansi(destination, {fg: toBright(color), style: "underline"})
		].join("");
	}
};
const centerString = (str, width, padChar = " ") => {
	let padString = `${str}`;
	while (padString.length < width) {
		padString = `${padChar}${padString}${padChar}`;
	}
	return padString.length > width ? padString.slice(1) : padString;
};
const padHeaderLines = (match) => {
	const padLine = (line, length) => {
		const padLength = length - line.length;
		if (padLength > 0) {
			const [padLeft, padRight] = [Math.ceil(padLength / 2), Math.ceil(padLength / 2)];
			const [lineLeft, lineRight] = [
				line.slice(0, Math.floor(line.length / 2)),
				line.slice(Math.floor(line.length / 2))
			];
			// Two types of padding: '█' and '░'. Count amount of each to get relative ratio.
			const fadePad = lineLeft.match(/░+/u)?.pop().length ?? 0;
			const fullFadeRatio = fadePad === 0 ? 1 : (lineLeft.match(/░+/)?.pop().length ?? 0) / fadePad;
			let numFullPadLeft = Math.round((fullFadeRatio * padLeft) / (1 + fullFadeRatio)),
							numFadePadLeft = 0,
							numFullPadRight = Math.round((fullFadeRatio * padRight) / (1 + fullFadeRatio)),
							numFadePadRight = 0;
			if (fadePad > 0) {
				numFadePadLeft = padLeft - numFullPadLeft;
				numFadePadRight = padRight - numFullPadRight;
			} else {
				numFullPadLeft = padLeft;
				numFullPadRight = padRight;
			}
			numFullPadRight += padLength - (numFullPadLeft + numFadePadLeft + numFullPadRight + numFadePadRight);
			return [
				lineLeft.replace(/▌█/u, `▌${"█".repeat(numFullPadLeft + 1)}`).replace(/░/u, "░".repeat(numFadePadLeft + 1)),
				lineRight.replace(/█▐/u, `${"█".repeat(numFullPadRight + 1)}▐`).replace(/░/u, "░".repeat(numFadePadRight + 1))
			].join("");
		}
		return line;
	};
	const lines = match.split(/\n/s);
	const returnLines = [];
	let [maxIndex, maxLen] = [0, 0];
	lines.forEach((line, i) => {
		if (line.length > maxLen) {
			maxIndex = i;
			maxLen = line.length;
		}
	});
	lines.forEach((line) => {
		if (line.length < maxLen) {
			returnLines.push(padLine(line, maxLen));
		} else {
			returnLines.push(line);
		}
	});
	return returnLines.join("\n");
};
// #endregion ▮▮▮▮[UTILITY]▮▮▮▮

const ISDEPLOYING = false;

// #region ████████ CONFIGURATION: Banner Headers, Source/Destination Globs, Build Behavior ████████
const BANNERTEMPLATE = {
	full: `/* ****▌███████████████████████████████████████████████████████████████████████████▐**** *\\
|*     ▌█░░░░░░░░░ Kult Tarot ░░░░░░░░░░░█▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░ by Eunomiac ░░░░░░░░░░░░░██████████████████▐     *|
|*     ▌█ <%= package.license %> License █ v<%= package.version %> █ ${
	ISDEPLOYING
		? new Date()
			.toString()
			.match(/\b[A-Z][a-z]+ \d+ \d+/)
			.shift()
		: ""
} █▐     *|
|*     ▌████░░░░ <%= package.url %> ░░░░█████▐     *|
\\* ****▌███████████████████████████████████████████████████████████████████████████▐**** */\n\n`,
	min: [
		`/* ▌██░░ <%= package.name %> v<%= package.version %> (${new Date().getFullYear()})`,
		"<%= package.license %> License",
		"<%= package.url %> ░░██▐ */"
	].join(" ║ ")
};
const BUILDFILES = {
	js: {
		"./dist/kult/scripts/": ["scripts/**/*.mjs", "scripts/**/*.js"]
	},
	css: {
		"./dist/kult/css/": ["scss/**/*.scss"],
		"./css/": ["scss/**/*.scss"]
	},
	hbs: {
		"./dist/kult/": ["*.hbs", "*.html"]
	},
	assets: {
		"./dist/kult/assets/": ["assets/**/*.*"],
		"./dist/kult/": ["LICENSE.txt", "package.json"]
	}
};
const REGEXPPATTERNS = {
	js: new Map([
		[/(\r?\n?)[ \t]*\/\*DEVCODE\*\/(?:.|\r?\n)*?\/\*!DEVCODE\*\/(\r?\n?)/gs, "$1$2"], // Strip developer code
		[/\/\* \*{4}▌.*?▐\*{4} \*\//s, padHeaderLines], // Pad header lines to same length
		[/(\r?\n?)[ \t]*\/\*[*~](?:.|\r?\n|\r)*?\*\/[ \t]*(\r?\n?)/g, "$1$2"], // Strip multi-line comments beginning with '/*~' or '/**'
		[/(\r?\n?)[ \t]*\/\/~.*?$/gm, "$1"], // Strip single-line comments beginning with '//~'
		[/[ \t]*\/\/[ \t]*eslint.*$/gm, ""], // Strip eslint enable/disable single-line comments
		[/[ \t]*\/\*[ \t]*eslint[^*]*\*\/[ \t]*/g, ""], // Strip eslint enable/disable mult-line comments
		[/[ \t]*\/\/ no default.*$/gm, ""], // Strip '// no default'
		[/[ \t]*\/\/ falls through.*$/gm, ""], // Strip '// falls through'
		[/[ \t]*~$/gm, ""], // Strip '~' from end-of-lines (used for automatic region folding)
		[/\.hbs/g, ".html"], // Convert references to .hbs files to .html files
		[/#reg.*? /gs, ""], // Convert region headers to standard headers
		[/(\r?\n?)[ \t]*\/\/ #endreg.*[ \t]*\r?\n?/g, "\r\n"], // Remove region footers
		[/(\r?\n[ \t]*(?=\r?\n)){2,}/g, "\r\n"], // Strip excess blank lines
		[/[ \t]*\r?\n$/g, ""], // Strip whitespace from end of files
		[/^[ \t]*\r?\n/g, ""] // Strip whitespace from start of files
	]),
	hbs: new Map([
		[/\.hbs/g, ".html"] // Convert references to .hbs files to .html files
	])
};
const PIPES = {
	openPipe: (title = "gulp") => {
		const [titleColor, padChar, tagName] = STREAMSTYLES[title] ?? ["red", "?", "???"];
		return plumber()
			.pipe(debug, {
				title: logParts.tag(tagName, titleColor, padChar),
				minimal: true,
				showFiles: true,
				showCount: false
			})
			.pipe(plunger, function errorReporter(err) {
				logger.error(logParts.error(title, err.message));
				this.emit("end");
			});
	},
	replacer: (format) => {
		let pipeline = plumber();
		if (format in REGEXPPATTERNS) {
			REGEXPPATTERNS[format].forEach((rParam, sParam) => {
				pipeline = pipeline.pipe(replacer, sParam, rParam);
			});
		}
		return pipeline;
	},
	terser: () => plumber().pipe(terser, {
		parse: {},
		compress: {},
		mangle: {
			properties: {}
		},
		format: {},
		sourceMap: {},
		ecma: 2020,
		module: true
	}),
	closePipe: (title, source, destination) => {
		const thisDest = dest(destination);
		thisDest.on("finish", () => logger(logParts.finish(title, source, destination)));
		return thisDest;
	}
};
const PLUMBING = {
	init: function initDist(done) {
		try {
			cleaner.sync(["./dist/"]);
		} catch (err) {
			return done();
		}
		return done();
	},
	watch: function watchUpdates() {
		for (const [type, globs] of Object.entries(BUILDFILES)) {
			Object.values(globs ?? {}).forEach((glob) => watch(glob, BUILDFUNCS[type]));
		}
	},
	jsFull: (source, destination) => function pipeFullJS() {
		return src(source)
			.pipe(PIPES.openPipe("jsFull")())
			.pipe(header(BANNERS.js.full, {"package": packageJSON}))
			.pipe(PIPES.replacer("js")())
			.pipe(PIPES.closePipe("jsFull", source, destination));
	},
	jsMin: (source, destination) => function pipeMinJS() {
		return src(source)
			.pipe(PIPES.openPipe("jsMin")())
			.pipe(header(BANNERS.js.min, {"package": packageJSON}))
			.pipe(PIPES.replacer("js")())
			.pipe(renamer({suffix: ".min"}))
			.pipe(PIPES.terser()())
			.pipe(PIPES.closePipe("jsMin", source, destination));
	},
	cssFull: (source, destination) => function pipeFullCSS() {
		return src(source)
			.pipe(PIPES.openPipe("cssFull")())
			.pipe(sasser({outputStyle: "nested"}))
			.pipe(bundler([prefixer({cascade: false})]))
			.pipe(PIPES.closePipe("cssFull", source, destination));
	},
	cssMin: (source, destination) => function pipeMinCSS() {
		return src(source)
			.pipe(PIPES.openPipe("cssMin")())
			.pipe(sasser({outputStyle: "compressed"}))
			.pipe(bundler([prefixer({cascade: false}), minifier()]))
			.pipe(header(BANNERS.css.min, {"package": packageJSON}))
			.pipe(PIPES.closePipe("cssMin", source, destination));
	},
	hbs: (source, destination) => function pipeHBS() {
		return src(source)
			.pipe(PIPES.openPipe("hbs")())
			.pipe(PIPES.replacer("hbs")())
			.pipe(renamer({extname: ".html"}))
			.pipe(PIPES.closePipe("hbs", source, destination));
	},
	toDest: (source, destination) => function pipeToDest() {
		return src(source).pipe(PIPES.openPipe("toDest")()).pipe(PIPES.closePipe("toDest", source, destination));
	}
};
// #endregion ▄▄▄▄▄ CONFIGURATION ▄▄▄▄▄

// #region ▒░▒░▒░▒[INITIALIZATION]▒░▒░▒░▒ ~

const BANNERS = {
	js: {...BANNERTEMPLATE},
	css: {...BANNERTEMPLATE}
};

const BUILDFUNCS = {};
// #endregion ▒▒▒▒[INITIALIZATION]▒▒▒▒

// #region ████████ JS: Compiling Javascript ████████ ~
BUILDFUNCS.js = parallel(
	...((buildFiles) => {
		const funcs = [];
		for (const [destGlob, sourceGlobs] of Object.entries(buildFiles)) {
			sourceGlobs.forEach((sourceGlob) => {
				funcs.push(PLUMBING.jsMin(sourceGlob, destGlob));
				funcs.push(PLUMBING.jsFull(sourceGlob, destGlob));
			});
		}
		return funcs;
	})(BUILDFILES.js)
);
// #endregion ▄▄▄▄▄ JS ▄▄▄▄▄

// #region ████████ CSS: Compiling CSS ████████ ~
BUILDFUNCS.css = parallel(
	...((sourceDestGlobs) => {
		const funcs = [];
		for (const [destGlob, sourceGlobs] of Object.entries(sourceDestGlobs)) {
			const formatType = /dist/.test(destGlob) ? "cssMin" : "cssFull";
			funcs.push(PLUMBING[formatType](sourceGlobs[0], destGlob));
		}
		logger(`There are ${funcs.length} CSS Build Funcs.`);
		return funcs;
	})(BUILDFILES.css)
);
// #endregion ▄▄▄▄▄ CSS ▄▄▄▄▄

// #region ████████ HBS: Compiling HBS ████████ ~

BUILDFUNCS.hbs = parallel(
	...((sourceDestGlobs) => {
		const funcs = [];
		for (const [destGlob, sourceGlobs] of Object.entries(sourceDestGlobs)) {
			sourceGlobs.forEach((sourceGlob) => {
				funcs.push(PLUMBING.hbs(sourceGlob, destGlob));
			});
		}
		return funcs;
	})(BUILDFILES.hbs)
);
// #endregion ▄▄▄▄▄ HBS ▄▄▄▄▄

// #region ████████ ASSETS: Copying Assets to Dist ████████ ~
BUILDFUNCS.assets = parallel(
	...((sourceDestGlobs) => {
		const funcs = [];
		for (const [destGlob, sourceGlobs] of Object.entries(sourceDestGlobs)) {
			sourceGlobs.forEach((sourceGlob) => funcs.push(PLUMBING.toDest(sourceGlob, destGlob)));
		}
		return funcs;
	})(BUILDFILES.assets)
);
// #endregion ▄▄▄▄▄ ASSETS ▄▄▄▄▄

// #region ▒░▒░▒░▒[EXPORTS]▒░▒░▒░▒ ~
exports.default = series(PLUMBING.init, parallel(...Object.values(BUILDFUNCS)), PLUMBING.watch);
// #endregion ▒▒▒▒[EXPORTS]▒▒▒▒
