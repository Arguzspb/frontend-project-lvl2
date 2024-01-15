install:
	npm ci
gendiff:
	./bin/gendiff.js
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watch
test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage