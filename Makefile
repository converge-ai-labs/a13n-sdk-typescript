.DEFAULT_GOAL := help
.PHONY: help install hooks-install hooks-check generate format lint typecheck check test build package package-acceptance check-all

help:
	@echo 'install | hooks-install | hooks-check | generate | format | lint | typecheck | check | test | build | package | package-acceptance | check-all'

install:
	npm ci

hooks-install:
	git config --local core.hooksPath .githooks

hooks-check:
	sh .githooks/pre-commit

generate:
	npm run generate

format:
	npm run format

lint:
	npm run format:check
	npm run lint

typecheck:
	npm run typecheck

check:
	npm run check

test:
	npm test

build:
	npm run build

package:
	npm pack

package-acceptance:
	npm run package:acceptance

check-all:
	npm run check:all
