import { rollup } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  dest: 'dist/styled-media-query.umd.js',
  format: 'umd',
  moduleName: 'styled-media-query',
  sourceMap: true,
  exports: 'named',
  plugins: [
    resolve({ 
      jsnext: true,
      module: true,
      main: true,
    }), 
    babel()
  ],
  external: ['react', 'styled-components'],
};
