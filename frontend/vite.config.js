import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

process.loadEnvFile()
const { env } = process;

// https://vite.dev/config/
export default defineConfig({
  base: env.REACT_APP_DEPLOY_URL ?? "/",
  publicDir: env.REACT_APP_PUBLIC_OUTPUT_PATH ?? "public",
  build: {
    outDir: env.REACT_APP_OUT_DIR ?? "dist",
    assetsDir: env.REACT_APP_ASSETS_OUTPUT_PATH ?? "assets",
  },
  plugins: [react()],
  // build: {
  //   /** To ignore the warnings about the non-module
  //    *  js files that cannot be bundled
  //    */
  //   rollupOptions: {
  //     onwarn: (warning, warn) => {
  //       // Suppress specific warnings
  //       if (warning.code === 'UNUSED_EXTERNAL') {
  //         // ignore this specific warning if you encounter it
  //         return;
  //       }
  //       // Pass all other warnings to the default warning handler
  //       warn(warning);
  //     },
  //   },
  // },
});