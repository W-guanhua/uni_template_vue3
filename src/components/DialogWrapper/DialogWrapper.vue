<template>
	<div class="d-dialog-wrapper"
        :class="wrapperClass"
        v-if="isShow"
        :style="styleObj.wrapper"
    >
		<div class="d-dialog-mask"
            :class="[animationClass.mask]"
            @touchmove.prevent
            v-show="showModal"
        ></div>
		<!-- 弹窗内容: 有进出场动效 -->
		<div
            @click.self="$emit('modal-click')"
            class="d-dialog-content"
            :class="[animationClass.content, contentClass]"
        >
			<!-- 页面内容 -->
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import properties from './properties'
import { ref, computed, watch } from 'vue'
const props = defineProps(properties)

const isShow = ref(props.visible)

const animationClass = computed(() => {
    return {
        mask: props.visible ? props.maskIn : props.maskOut,
        content: props.visible ? props.contentIn : props.contentOut
    }
})
const wrapperClass = computed(() => {
    return props.wrapper === 'fixed' ? 'is-fixed' : 'is-abs'
})
const styleObj = computed(() => {
    return {
        wrapper: {
            zIndex: 999 + props.zIndex
        }
    }
})

watch(() => props.visible, (newVal, oldVal) => {
    if (newVal !== oldVal && !newVal) {
        setTimeout(() => {
            isShow.value = newVal
        }, props.animationDuration)
    } else {
        isShow.value = newVal
    }
})

</script>

<style lang="less" src="./style.less" scoped>
</style>
