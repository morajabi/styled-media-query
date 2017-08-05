import { rollup } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  format: 'umd',
  moduleName: 'StyledMediaQuery',
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
  dest: 'dist/bundle.js'
};
