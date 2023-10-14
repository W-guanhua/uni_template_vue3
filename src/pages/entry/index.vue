<template>
  <div class="page-body">
      <!-- code edit -->
      <!-- 页面弹窗组件引入 -->
      <dialog-Example></dialog-Example>
  </div>
</template>

<script setup >
import { onLoad } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/useUserStore'
import { useDialogStore } from '@/store/useDialogStore'
import { getWeather } from '@/apis/example'

const { fetchUserIndex } = useUserStore()
const { openDialog } = useDialogStore()
onLoad(async () => {
    await fetchUserIndex()
    const data = await getWeather()
    console.log('data', data)
    openDialog('Example')
})
</script>

<style lang="less" scoped src="./index.less">

</style>
