const ISSTRICTSTYLE = false;
const PLUGINSCONFIG = {
	"stylelint-config-standard-scss": true,
	"stylelint-config-recess-order": true
};
const RULES = {
	"color-function-notation": "legacy",
	"color-hex-case": ["upper"],
	"color-hex-length": ["long"],
	"declaration-block-trailing-semicolon": ["always", {
		ignore: ["single-declaration"]
	}],
	"indentation": "tab",
	"linebreaks": "windows",
	"max-nesting-depth": null,
	"no-invalid-position-at-import-rule": null,
	"order/properties-alphabetical-order": null,
	"selector-max-compound-selectors": null,
	"selector-max-id": 1
};
const IGNOREDFILES = [
	".EXAMPLES&REFERENCE/**",
	"node_modules/**",
	"css/**",
	"dist/**",
	"*.mjs",
	"*.js",
	"*.min.js",
	"FoundryVTT/**",
	"resources/**",
	"Draggable.min.js"
];

module.exports = {
	"extends": Object.keys(PLUGINSCONFIG).filter((plugin) => PLUGINSCONFIG[plugin]),
	"overrides": [
		{
			files: ["**/*.scss"],
			customSyntax: "postcss-scss"
		}
	],
	"rules": RULES,
	"ignoreFiles": IGNOREDFILES,
	"defaultSeverity": "warning",
	"reportNeedlessDisables": true,
	"reportInvalidScopeDisables": true,
	"reportDescriptionlessDisables": true
};