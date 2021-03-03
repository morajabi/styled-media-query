import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const prod = process.env.PRODUCTION;

let config = {
  input: 'src/index.js',
  output: {
    sourcemap: true,
    exports: 'named',
  },
  external: ['react', 'styled-components'],
};

let plugins = [resolve(), commonjs(), babel({ babelHelpers: 'bundled' })];

const globals = {
  'styled-components': 'styledComponents',
  react: 'React',
  'react-dom': 'ReactDOM',
};

if (prod) plugins.push(terser());

if (process.env.BROWSER) {
  config = Object.assign(config, {
    output: {
      file: 'dist/styled-media-query.umd.js',
      format: 'umd',
      name: 'styled-media-query',
      sourcemap: true,
      exports: 'named',
      globals,
    },
    plugins,
  });
} else if (process.env.COMMON) {
  config = Object.assign(config, {
    plugins,
    output: {
      file: 'dist/styled-media-query.common.js',
      format: 'cjs',
      exports: 'named',
    },
  });
} else if (process.env.ES) {
  config = Object.assign(config, {
    plugins,
    output: {
      file: 'dist/styled-media-query.es.js',
      format: 'es',
    },
  });
}

export default config;
