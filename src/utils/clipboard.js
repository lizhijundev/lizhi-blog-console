import Clipboard from 'clipboard'
import { ElMessage } from 'element-plus'

function clipboardSuccess(text) {
  ElMessage.success(`复制${text}成功`)
}

function clipboardError(text) {
  ElMessage.error(`复制${text}失败`)
}

/**
 * @description 复制数据
 * @param text
 * @param event
 */
export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text,
  })
  clipboard.on('success', () => {
    clipboardSuccess(text)
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError(text)
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
