<template>
  <div class="container">
      <web-view :src="url" v-if="url" class="webview"></web-view>
      <p v-else>页面异常，稍后再试</p>
  </div>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue'

let url = ref('')

onLoad((options?: any) => {
  if (options && options.url) {
      url.value = options.url
  }
})

</script>

<style scoped>
.container{
  width: 100vw;
  height: 100vh;
}
.webview{
  width: 100vw;
  height: 100vh;
}
</style>
