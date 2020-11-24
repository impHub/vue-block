import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import * as mockData from './moke'
// @ts-ignore
axios.get = async (url: string) => {
    console.log(url);

    if (url === "/posts") {
        return Promise.resolve({
            data: [mockData.todayPost, mockData.thisWeek, mockData.thisMonth]
        })
    }
}

createApp(App).use(router).mount('#app')
