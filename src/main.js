import { createSSRApp } from 'vue'
import App from './App.vue'
import { createPinia as createPina } from 'pinia'

export function createApp () {
    const app = createSSRApp(App)
    app.use(createPina())
    return {
        app,
    }
}
