import Clipboard from 'clipboard'
import { gp } from '@vab'

function clipboardSuccess(text) {
  gp.$baseMessage(`拷贝${text}成功`, 'success', 'vab-hey-message-success')
}

function clipboardError(text) {
  gp.$baseMessage(`拷贝${text}失败`, 'error', 'vab-hey-message-success')
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
