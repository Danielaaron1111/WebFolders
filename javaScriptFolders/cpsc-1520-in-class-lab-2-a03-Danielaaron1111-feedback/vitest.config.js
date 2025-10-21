/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    // globals: true,
    // environment: 'happy-dom',
    reporters: ['default', ['@d2t/vitest-ctrf-json-reporter', {}]]
  },
})
