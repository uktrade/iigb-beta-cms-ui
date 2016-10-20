all:
	./node_modules/babel-cli/bin/babel.js lib --out-dir dist
	./node_modules/node-sass/bin/node-sass lib/react-ui-tree.scss dist/react-ui-tree.css
	./node_modules/webpack/bin/webpack.js -p
clean:
	rm dist/*
	rm example/bundle*
