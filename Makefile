.DEFAULT_GOAL := help
.PHONY: help install generate generated-check format check test build package check-all

help:
	@echo 'install | generate | generated-check | format | check | test | build | package | check-all'

install:
	npm ci

generate:
	npm run generate

generated-check:
	npm run generate:check

format:
	npm run format

check:
	npm run check

test:
	npm test

build:
	npm run build

package:
	npm pack

check-all:
	npm run check:all
