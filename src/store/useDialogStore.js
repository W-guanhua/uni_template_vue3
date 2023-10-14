import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import dialogNameList from '@/dialogs/index'
import Queue from '@/utils/quene'

const dialogQuene = new Queue()
export const useDialogStore = defineStore('dialogStore', () => {
    const visible = reactive(Object.keys(dialogNameList).reduce((result, key) => {
        result[key] = false
        return result
    }, {})
    )
    const openPayLoad = reactive(Object.keys(dialogNameList).reduce((result, key) => {
        result[key] = undefined
        return result
    }, {})
    )

    const done = ref(null)

    function openDialog (name, payload, immediate) {
        return new Promise((resolve) => {
            if (dialogQuene.isEmpty || immediate) {
                openDialogQuene(name, resolve, payload)
            }
            dialogQuene[immediate ? 'stickqueue' : 'enqueue'](() => openDialogQuene(name, resolve, payload))
        })
    }

    function openDialogQuene (name, resFunction, payload) {
        visible[name] = true

        openPayLoad[name] = payload

        /** 返回一个Promise[pedding] */
        done.value = resFunction
    }

    function closeDialog (name, payload, exitTask) {
        dialogQuene.dequeue()
        visible[name] = false

        done.value && done.value(payload)
        done.value = null
        if (!dialogQuene.isEmpty && !exitTask) {
            dialogQuene.firstTask()
        }
    }

    return {
        visible,
        openPayLoad,
        openDialog,
        closeDialog
    }
})
