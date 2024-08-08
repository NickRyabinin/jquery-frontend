install:
	npm install
lint:
	npx htmlhint ./src/*.html
	npx stylelint ./src/styles/*.css
	npx eslint ./src/ --ignore-pattern '*/scripts/jquery-3.7.1.min.js'
start:
	npx http-server ./src/ -o
