import { defineStore } from 'pinia'
import { useActivityStore } from './useActivityStore'
import { getWeather } from '@/apis/example'
import { ref } from 'vue'
const { updateActivityStatus, checkActivityStatus } = useActivityStore()

export const useUserStore = defineStore('userStore', () => {
    // 首页接口
    const fetchUserIndex = async () => {
        // TODO 获取首页内容
        // 检查活动状态
        // TODO 更新活动状态
        // updateActivityStatus()
        checkActivityStatus()
    }

    // example code
    const weatherCondition = ref('')

    const fetchExampleIndex = async () => {
        const { result } = await getWeather()
        weatherCondition.value = result?.condition?.condition
    }

    return {
        weatherCondition,
        fetchExampleIndex,
        fetchUserIndex
    }
})
