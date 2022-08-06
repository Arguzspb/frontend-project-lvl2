install:
	npm ci
gendiff:
	./bin/gendiff.js
publish:
	npm publish --dry-run