<template>
  <div class="common-page">
    <template v-if="status !== ActivityStatus.ERROR">
      <div class="status-pic mb-20" v-if="ActivityStatusEnum2Img[status]">
        <img class="img"
          :src="ActivityStatusEnum2Img[status]"
          mode="widthFix" />
      </div>
      <div class="common-text mb-40">
        {{ ActivityStatusEnum2Str[status] }}
      </div>
    </template>
    <template v-else>
      <div class="status-pic mb-20" v-if="ActivityStatusEnum2Img[ActivityStatus.ERROR]">
        <img class="img"
          :src="ActivityStatusEnum2Img[ActivityStatus.ERROR]"
          mode="widthFix" />
      </div>
      <div class="common-text mb-40">
       {{ ActivityStatusEnum2Str[status] }}
      </div>
      <div class="common-button"
        @click="refresh()">刷新试试</div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { ActivityStatus, ActivityStatusEnum2Img, ActivityStatusEnum2Str } from '../../config/activity'

const status = ref('')
const refresh = () => {
    uni.redirectTo({
        url: '/pages/entry/index',
    })
}
onLoad((options) => {
    status.value = (options && options.status) || ActivityStatus.ERROR
})
</script>

<style lang="less" src="./index.less">
</style>
