<template>
  <DialogWrapper  :visible="visible">
    <div class="dialog-content">
      <div class="dialog-close" @click="close"></div>
    </div>
  </DialogWrapper>
</template>

<script setup >
import useDialog from '@/hooks/useDialog'

const NAME = 'Example'

const {
    visible,
    openPayLoad,
    close
} = useDialog(NAME)

</script>
<style lang="less" scoped>
</style>
