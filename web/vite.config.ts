import redwood from '@redwoodjs/vite'
// @ts-expect-error: error is from official vite support which is experimental. should be fixed upstream.
import dns from 'dns'

// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig, UserConfig } from 'vite'
// eslint-disable-next-line import/no-extraneous-dependencies
import checker from 'vite-plugin-checker'

// See: https://vitejs.dev/config/server-options.html#server-host
// So that Vite will load on local instead of 127.0.0.1
dns.setDefaultResultOrder('verbatim')

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
const viteConfig: UserConfig = {
  plugins: [
    redwood(),
    checker({
      enableBuild: false,
      // e.g. use TypeScript check
      typescript: true,
      eslint: {
        // for example, lint .ts and .tsx
        lintCommand: 'eslint {**/*.js,**/*.ts,**/*.tsx}',
      },
    }),
  ],
}

export default defineConfig(viteConfig)
