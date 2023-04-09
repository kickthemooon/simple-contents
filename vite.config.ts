// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            formats: ['umd', 'es'],
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'SimpleContents',
            // the proper extensions will be added
            fileName: 'simple-contents',
        }
    }
})
