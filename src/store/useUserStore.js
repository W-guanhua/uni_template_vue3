import { defineStore } from 'pinia'
import { useActivityStore } from './useActivityStore'

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

    return {
        fetchUserIndex
    }
})
