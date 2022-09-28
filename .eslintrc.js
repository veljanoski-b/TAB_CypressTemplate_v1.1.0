module.exports = {
	extends: ["airbnb", "prettier"],
	plugins: ["prettier", "cypress"],
	env: {
		mocha: true,
		node: true,
		"cypress/globals": true
	},
	rules: {
		"import/prefer-default-export": 0,
		"import/no-unresolved": 0,
		"import/extensions": 0,
		"no-console": 0,
		"func-names": 0,
		"no-empty": 0,
		"class-methods-use-this": 0,
		"max-len": 1,
		"no-plusplus": 0,
		camelcase: 0,
		"valid-jsdoc": 1,
		"linebreak-style": 0,
		strict: "off",
		"spaced-comment": 0
	}
};
