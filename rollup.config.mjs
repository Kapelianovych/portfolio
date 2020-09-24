import url from '@rollup/plugin-url';
import dev from 'rollup-plugin-dev';
import copy from 'rollup-plugin-copy';
import nested from 'postcss-nested';
import cleaner from 'rollup-plugin-cleaner';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import inlineImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import injectManifest from 'rollup-plugin-workbox-inject';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

/**
 * You may change constants below as you want.
 * Note that relative changes need to be done in files
 * or directories that relies on this names.
 */
const BUILD_DIR_NAME = 'docs';
/** Name of the directory for transformed js, css and images. */
const EMIT_DIR_NAME = 'build';
// Change if you have another file as entry point.
const ENTRY_FILE_NAME = 'index';
// Append this path to every path that contain __PUBLIC_PREFIX_PATH__ variable.
const __PUBLIC_PREFIX_PATH__ =
  process.env.NODE_ENV === 'production' ? '/portfolio' : '';

export default [
  {
    input: `src/${ENTRY_FILE_NAME}.ts`,
    output: {
      file: `${BUILD_DIR_NAME}/${EMIT_DIR_NAME}/index.js`,
      format: 'cjs',
      plugins: [terser()],
    },
    plugins: [
      cleaner({
        targets: [`${BUILD_DIR_NAME}/${EMIT_DIR_NAME}`],
      }),
      replace({
        __PUBLIC_PREFIX_PATH__,
      }),
      typescript({
        noEmitOnError: false,
      }),
      url({
        destDir: `${BUILD_DIR_NAME}/${EMIT_DIR_NAME}/images`,
        publicPath: `${__PUBLIC_PREFIX_PATH__}/${EMIT_DIR_NAME}/images/`,
      }),
      postcss({
        plugins: [inlineImport(), nested(), autoprefixer()],
        extract: true,
        minimize: true,
      }),
      nodeResolve({ browser: true }),
      copy({
        copyOnce: true,
        targets: [
          {
            src: ['public/index.html', 'public/manifest.json'],
            dest: BUILD_DIR_NAME,
            transform(content) {
              return content
                .toString()
                .replace(/__PUBLIC_PREFIX_PATH__/g, __PUBLIC_PREFIX_PATH__);
            },
          },
          {
            src: [
              'public/favicon.ico',
              'public/robots.txt',
              'public/icons',
              'public/styles',
            ],
            dest: BUILD_DIR_NAME,
          },
        ],
      }),
      dev({
        dirs: [BUILD_DIR_NAME],
        spa: `${BUILD_DIR_NAME}/index.html`,
        port: 3000,
      }),
    ],
  },
  {
    input: 'src/service_worker/service_worker.js',
    output: {
      file: `${BUILD_DIR_NAME}/service_worker.js`,
      format: 'cjs',
      plugins: [terser()],
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'production'
        ),
        __PUBLIC_PREFIX_PATH__,
      }),
      injectManifest({
        globDirectory: BUILD_DIR_NAME,
        globPatterns: ['./**/*'],
      }),
      nodeResolve({ browser: true }),
    ],
  },
];
