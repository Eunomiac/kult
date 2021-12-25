const ACTIVERULES = [
	// "DEPLOYING" // Toggle rule changes appropriate to package deployment.
	// "FULL" // Toggle (most) inactive rules ON.
	"FIXING_COMMENTS"
];

const ISDEPLOYING = false; // Toggle rule changes appropriate to package deployment.
const ALLRULESACTIVE = false; // Toggle (most) inactive rules ON.

const GLOBALCONSTANTS = [
	// ["CONFIG", "foundry", "game", "canvas", "ui"],
	// [
	// 	"Actor",
	// 	"ActorSheet",
	// 	"Actors",
	// 	"Application",
	// 	"ChatMessage",
	// 	"Dialog",
	// 	"Draggable",
	// 	"FormDataExtended",
	// 	"Handlebars",
	// 	"Hooks",
	// 	"Item",
	// 	"ItemSheet",
	// 	"Items",
	// 	"Macro",
	// 	"Roll",
	// 	"TextureLoader",
	// 	"User"
	// ],
	// ["duplicate", "loadTemplates", "mergeObject", "setProperty", "isObjectEmpty"],
	// ["DEFAULT_TOKEN"]
].flat();
const GENERALRULES = {
	/* If ALLRULESACTIVE = true, any GENERALRULES set to '0' will instead "warn".
          To ensure the rule stays off, set it to "off" instead of '0'. */
	"accessor-pairs": ["warn"],
	"array-callback-return": "warn",
	"array-element-newline": ["warn", "consistent"],
	"block-scoped-var": "warn",
	"brace-style": ["warn", "1tbs", {
		allowSingleLine: true
	}],
	"capitalized-comments": "off",
	"class-methods-use-this": 0,
	"comma-dangle": ["warn", "never"],
	"consistent-return": ["warn", {
		treatUndefinedAsUnspecified: true
	}],
	"curly": "warn",
	"default-case": "warn",
	"dot-notation": ["warn"],
	"eol-last": 0,
	"eqeqeq": ["warn", "always"],
	"func-names": ["error", "as-needed"],
	"function-call-argument-newline": ["warn", "consistent"],
	"function-paren-newline": "warn",
	"import": { // eslint-plugin-import
		"extensions": ["warn", {
			js: "always",
			mjs: "always",
			jsx: "always",
			scss: "never",
			css: "never"
		}],
		"named": 0,
		"no-absolute-path": "off",
		"no-cycle": 0,
		"no-self-import": "error",
		"no-unresolved": "warn",
		"no-useless-path-segments": "warn"
	},
	"indent": ["warn", "tab", {
		ArrayExpression: "first",
		CallExpression: {
			arguments: "first"
		},
		FunctionDeclaration: {
			parameters: "first",
			body: 1
		},
		FunctionExpression: {
			parameters: "first",
			body: 1
		},
		ImportDeclaration: "first",
		MemberExpression: 1,
		ObjectExpression: "first",
		SwitchCase: 1,
		VariableDeclarator: "first",
		flatTernaryExpressions: true,
		ignoreComments: !ACTIVERULES.includes("FIXING_COMMENTS"),
		offsetTernaryExpressions: true,
		outerIIFEBody: 1
	}],
	"line-comment-position": "off",
	"linebreak-style": ["warn", "windows"],
	"lines-between-class-members": 0,
	"max-classes-per-file": 0,
	"max-len": "off",
	"max-lines-per-function": "off",
	"max-params": "off",
	"max-statements": "off",
	"multiline-comment-style": 0,
	"multiline-ternary": ["warn", "always-multiline"],
	"new-cap": ["error", {
		capIsNewExceptionPattern: "[A-Z]+"
	}],
	"no-bitwise": ["error", {
		allow: ["~"]
	}],
	"no-confusing-arrow": ["warn", {
		allowParens: true
	}],
	"no-console": 0,
	"no-constant-condition": ["warn", {
		checkLoops: false
	}],
	"no-continue": 0,
	"no-else-return": 0,
	"no-empty-function": 0,
	"no-eq-null": "warn",
	"no-eval": "warn",
	"no-extend-native": 0,
	"no-extra-bind": "warn",
	"no-extra-parens": ["warn", "all", {
		conditionalAssign: false,
		returnAssign: false,
		enforceForArrowConditionals: false,
		nestedBinaryExpressions: false
	}],
	"no-floating-decimal": "warn",
	"no-implicit-coercion": "warn",
	"no-implicit-globals": "warn",
	"no-implied-eval": "warn",
	"no-inline-comments": "off",
	"no-invalid-this": 0,
	"no-iterator": "warn",
	"no-labels": "warn",
	"no-lone-blocks": "warn",
	"no-lonely-if": 0,
	"no-loop-func": 0,
	"no-magic-numbers": "off",
	"no-mixed-operators": "warn",
	"no-mixed-spaces-and-tabs": ["warn", "smart-tabs"],
	"no-multi-spaces": ["warn", {
		ignoreEOLComments: true
	}],
	"no-multi-str": "warn",
	"no-multiple-empty-lines": "warn",
	"no-new": 0,
	"no-param-reassign": 0,
	"no-plusplus": 0,
	"no-restricted-globals": 0,
	"no-restricted-syntax": 0,
	"no-return-assign": ["error", "except-parens"],
	"no-return-await": 0, // Debugging is easier with this disabled, but comes with a performance hit.
	"no-tabs": 0, /* ["warn", {
		allowIndentationTabs: true
	}], */
	"no-template-curly-in-string": "warn",
	"no-ternary": "off",
	"no-trailing-spaces": "warn",
	"no-underscore-dangle": 0,
	"no-unreachable": 0,
	"no-unused-vars": "off",
	"no-use-before-define": 0,
	"no-useless-computed-key": 0,
	"no-useless-constructor": "warn",
	"no-useless-escape": 0,
	"no-void": 0,
	"nonblock-statement-body-position": ["warn", "below"],
	"object-curly-newline": 0,
	"object-curly-spacing": ["warn", "never"],
	"one-var": ["warn", {
		"var": "always",
		"let": "consecutive",
		"const": "never"
	}],
	"one-var-declaration-per-line": 0,
	"operator-linebreak": ["warn", "before"],
	"padded-blocks": "off",
	"prefer-arrow-callback": "warn",
	"prefer-const": ["warn", {
		destructuring: "all"
	}],
	"prefer-destructuring": "warn",
	"prefer-object-spread": "warn",
	"quote-props": ["warn", "consistent-as-needed", {
		keywords: true
	}],
	"quotes": ["warn", "double", {
		avoidEscape: true,
		allowTemplateLiterals: false
	}],
	"radix": 0,
	"semi": ["warn", "always", {
		omitLastInOneLineBlock: true
	}],
	"sort-keys": ["warn", "asc", {
		caseSensitive: true,
		natural: true,
		minKeys: 20
	}],
	"space-before-function-paren": ["warn", {
		anonymous: "never",
		named: "never",
		asyncArrow: "always"
	}],
	"spaced-comment": ["warn", "always", {
		line: {
			markers: ["~"]
		},
		block: {
			exceptions: ["*", "~", "DEVCODE", "!DEVCODE"],
			markers: ["~"],
			balanced: true
		}
	}]
};
const DEPLOYMENTRULES = {
	"import/no-cycle": "warn",
	"multiline-comment-style": ["warn", "starred-block"],
	"no-console": "error",
	"no-debugger": "error",
	"no-empty-function": "error",
	"no-prototype-builtins": "error",
	"no-trailing-spaces": "error",
	"no-unused-vars": "error"
};
const allRules = {};
Object.keys(GENERALRULES).forEach((rule) => {
	if (GENERALRULES[rule] === 0) {
		allRules[rule] = "warn";
	}
});
const RULES = Object.assign(
	GENERALRULES,
	ALLRULESACTIVE ? allRules : {},
	ISDEPLOYING ? DEPLOYMENTRULES : {}
);
Object.entries(RULES).forEach(([key, val]) => {
	if (val && !Array.isArray(val) && typeof val === "object") {
		Object.entries(val).forEach(([subKey, subVal]) => (RULES[`${key}/${subKey}`] = subVal));
		delete RULES[key];
	}
});

module.exports = {
	"env": {
		es6: true,
		es2020: true,
		browser: true,
		commonjs: true,
		node: true,
		jquery: true
	},
	"plugins": [
		"import"
	],
	"extends": [
		// ALLRULESACTIVE ? "eslint:all" : "eslint:recommended",
		"airbnb-base",
		"plugin:import/recommended"
	],
	"parserOptions": {
		ecmaVersion: "latest",
		sourceType: "module",
		allowImportExportEverywhere: false,
		codeFrame: false,
		ecmaFeatures: {
			jsx: false,
			impliedStrict: true
		}
	},
	"reportUnusedDisableDirectives": true,
	"rules": RULES,
	"globals": Object.fromEntries(GLOBALCONSTANTS.map((constant) => [constant, "readonly"]))
};
