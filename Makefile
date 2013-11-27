integration-watch:

	@./node_modules/.bin/mocha \
	--watch
	deathcartoons.suite.js

test:

	@make integration-watch

.PHONY test
