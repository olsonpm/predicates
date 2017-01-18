import path from 'path';
import pBuble from 'rollup-plugin-buble';

export default {
  entry: path.join(__dirname, 'index.js')
  , dest: path.join(__dirname, 'index.es5.js')
  , external: ['ramda', 'chai']
  , format: 'cjs'
  , plugins: [ pBuble() ]
};
