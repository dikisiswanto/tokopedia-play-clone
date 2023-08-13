/* eslint-disable no-undef */
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'import.meta.env.BASE_API_URL': JSON.stringify(env.BASE_API_URL),
      'import.meta.env.SOCKET_URL': JSON.stringify(env.SOCKET_URL),
    },
  };
});
