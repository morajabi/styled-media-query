import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

const prod = process.env.PRODUCTION;

let config = {
  entry: 'src/index.js',
  sourceMap: true,
  exports: 'named',
  external: ['react', 'styled-components'],
}

let plugins = [
  resolve(),
  commonjs(),
  babel(),
];

if (prod) plugins.push(uglify());

if (process.env.BROWSER) {
  config = Object.assign(config, {
    dest: 'dist/styled-media-query.umd.js',
    format: 'umd',
    moduleName: 'styled-media-query',
    sourceMap: true,
    exports: 'named',
    plugins,
  })

} else if (process.env.COMMON) {
  config = Object.assign(config, {
    plugins: [
      resolve(),
      commonjs(),
      babel(),
    ],
    dest: 'dist/styled-media-query.common.js',
    format: 'cjs',
  })

} else if (process.env.ES) {
  config = Object.assign(config, {
    plugins: [
      resolve(),
      commonjs(),
      babel(),
    ],
    dest: 'dist/styled-media-query.es.js',
    format: 'es',
  })
}

export default config;
