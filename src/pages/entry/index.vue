<template>
  <div class="page-body">
      <!-- code edit -->
      当前天气：{{ weatherCondition || '--' }}
      <!-- 页面弹窗组件引入 -->
      <dialog-Example></dialog-Example>
  </div>
</template>

<script setup >
import { onLoad } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/useUserStore'
import { useDialogStore } from '@/store/useDialogStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { fetchUserIndex, fetchExampleIndex } = userStore
const { weatherCondition } = storeToRefs(userStore)
const { openDialog } = useDialogStore()
onLoad(async () => {
    await fetchExampleIndex()
    openDialog('Example')
})
</script>

<style lang="less" scoped src="./index.less">

</style>
