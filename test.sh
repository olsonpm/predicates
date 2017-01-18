#! /usr/bin/env sh

./node_modules/rollup/bin/rollup -c ./tests/rollup.config.js
./node_modules/mocha/bin/mocha -u tdd ./tests/index.es5.js
