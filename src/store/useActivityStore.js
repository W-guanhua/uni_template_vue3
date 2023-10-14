import { defineStore } from 'pinia'
import { ActivityStatus } from '@/config/activity'
import { ref } from 'vue'

export const useActivityStore = defineStore('activityStore', () => {
    const activityStatus = ref(ActivityStatus.NORMAL)

    const updateActivityStatus = (status) => {
        activityStatus.value = status
    }
    const checkActivityStatus = () => {
        // 判断活动状态
        // NORMAL : 活动正常 UPGARDE : 活动升级 END : 活动结束
        if (activityStatus.value !== ActivityStatus.NORMAL) {
            uni.redirectTo({
                url: `/pages/activity-status/index?status=${activityStatus.value}`
            })
        }
    }

    return {
        updateActivityStatus,
        checkActivityStatus
    }
})
