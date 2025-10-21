import { defineConfig } from 'vite'

export default defineConfig({
  test: { 
    reporters: ['default', ['@d2t/vitest-ctrf-json-reporter', {}]]
  },
})
