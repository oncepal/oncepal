process.env.NODE_ENV = 'development';

import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import image from '@rollup/plugin-image';
import terser from '@rollup/plugin-terser'

export default [
  {
    input: 'src/index.ts',
  output: [
    {
      file: "build/index.js",
      format: 'es',
      sourcemap: process.env.NODE_ENV == 'development',
    },
    {
      name: 'ui',
      globals: 'ui',
      file: "build/index.umd.js",
      format: 'umd',
      sourcemap: process.env.NODE_ENV == 'development',
    },
  ],
  },
 
].map((entry) => ({
  ...entry,
  plugins: [
     peerDepsExternal(), // 支持深度依赖，解耦类库绑定，缩小体积
  filesize(),// 显示打包后体积
  resolve(), // 解析node第三方模块
  commonjs(), // 支持commonjs方式引入
  typescript(),
  image(),
  process.env.NODE_ENV == 'production' && terser()],
}));
