process.env.NODE_ENV = 'development';

import typescript from "@rollup/plugin-typescript";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
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
  filesize(),// 显示打包后体积
  resolve(), // 解析node第三方模块
  commonjs(), // 支持commonjs方式引入
  typescript(),
  process.env.NODE_ENV == 'production' && terser()],
}));
