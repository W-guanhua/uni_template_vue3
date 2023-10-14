import { useDialogStore } from '@/store/useDialogStore'
import { computed } from 'vue'
export default function useDialog (dialogName) {
    const _dialog = useDialogStore()

    const visible = computed(() => {
        return _dialog.visible[dialogName]
    })
    const openPayLoad = computed(() => {
        return _dialog.openPayLoad[dialogName]
    })
    const close = (payload, exitTask) => {
        _dialog.closeDialog(dialogName, payload, exitTask)
    }

    return {
        visible,
        openPayLoad,
        close,
        _dialog
    }
}
