MOCHA=./node_modules/.bin/mocha
TESTS=$(shell find test/ -name "*.suite.js")

e2e:

	@$(MOCHA) \
		--watch \
		$(TESTS)

test:

	make e2e

.PHONY: test
