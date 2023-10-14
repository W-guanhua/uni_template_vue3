import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import ReplaceStrPlugin from './plugins/replaceStr'
import { resolve } from 'path'

const pathResolve = (dir) => {
    return resolve(__dirname, '.', dir)
}

const alias = {
    '@': pathResolve('./src/'),
}
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        uni(),
        ReplaceStrPlugin([
            { pattern: /https:\/\/cdn.dcloud.net.cn\/img\/shadow-(.*?).png/g, urlPrefix: '' }
        ])
    ],
    resolve: { alias },
})
